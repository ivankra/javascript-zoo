// Standalone DLL host for Microsoft/Wine's jscript.dll.
// Implements REPL and script runner.
//
// Usage: jscript.exe [--dll jscript.dll] [--version] [script.js ...]
//
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

#include <activscp.h>
#include <ole2.h>
#include <oleauto.h>
#include <windows.h>

#include <cstdarg>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <cwchar>

namespace {

// Custom printf using WriteConsoleW directly - workaround for Wine's broken CRT with unicode strings
int win_vfwprintf(FILE* out, const wchar_t* fmt, va_list ap) {
  va_list ap_copy;
  va_copy(ap_copy, ap);
  const int len = _vscwprintf(fmt, ap_copy);
  va_end(ap_copy);
  if (len < 0) return -1;

  wchar_t* buf = static_cast<wchar_t*>(malloc((static_cast<size_t>(len) + 1) * sizeof(wchar_t)));
  if (!buf) return -1;

  va_list ap_fmt;
  va_copy(ap_fmt, ap);
  const int written_fmt = vswprintf(buf, static_cast<size_t>(len) + 1, fmt, ap_fmt);
  va_end(ap_fmt);
  if (written_fmt < 0) {
    free(buf);
    return -1;
  }

  HANDLE h = GetStdHandle(out == stdout ? STD_OUTPUT_HANDLE : STD_ERROR_HANDLE);
  if (h != INVALID_HANDLE_VALUE) {
    DWORD mode = 0;
    if (GetFileType(h) == FILE_TYPE_CHAR && GetConsoleMode(h, &mode)) {
      DWORD written = 0;
      bool ok = (written_fmt == 0) || WriteConsoleW(h, buf, static_cast<DWORD>(written_fmt), &written, nullptr);
      free(buf);
      return ok && written == static_cast<DWORD>(written_fmt) ? written_fmt : -1;
    }
  }

  const int ok = fputws(buf, out);
  free(buf);
  return ok == WEOF ? -1 : written_fmt;
}

int win_fwprintf(FILE* out, const wchar_t* fmt, ...) {
  va_list ap;
  va_start(ap, fmt);
  int rc = win_vfwprintf(out, fmt, ap);
  va_end(ap);
  return rc;
}

// fgetwc variant using ReadConsoleW directly
wint_t win_fgetwc(FILE* fp) {
  HANDLE h = GetStdHandle(STD_INPUT_HANDLE);
  DWORD mode = 0;
  if (fp != stdin || h == INVALID_HANDLE_VALUE || GetFileType(h) != FILE_TYPE_CHAR || !GetConsoleMode(h, &mode)) {
    return fgetwc(fp);
  }
  wchar_t ch = 0;
  DWORD read = 0;
  if (!ReadConsoleW(h, &ch, 1, &read, nullptr) || read == 0) return WEOF;
  return static_cast<wint_t>(ch);
}

#define fwprintf win_fwprintf
#define CHECK(cond) do { \
  if (!(cond)) { fwprintf(stderr, L"CHECK(\"%hs\") failed\n", #cond); exit(1); } \
} while (0)
#define CHECK_HR(expr) do { \
  HRESULT _hr = (expr); \
  if (FAILED(_hr)) { \
    fwprintf(stderr, L"%hs failed (0x%08lx)\n", #expr, static_cast<unsigned long>(_hr)); \
    exit(1); \
  } \
} while (0)

wchar_t* ReadFileUtf8(const wchar_t* path) {
  HANDLE h = CreateFileW(path, GENERIC_READ, FILE_SHARE_READ, nullptr, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, nullptr);
  if (h == INVALID_HANDLE_VALUE) {
    fwprintf(stderr, L"Cannot open file: %ls\n", path);
    exit(1);
  }
  LARGE_INTEGER size = {};
  CHECK(GetFileSizeEx(h, &size) != 0);
  CHECK(size.QuadPart >= 0 && size.QuadPart < 0x7FFFFFFF);
  int len = static_cast<int>(size.QuadPart);
  char* buf = static_cast<char*>(malloc(len + 1));
  CHECK(buf);
  DWORD got = 0;
  CHECK(ReadFile(h, buf, len, &got, nullptr) && got == static_cast<DWORD>(len));
  CloseHandle(h);
  buf[len] = 0;
  int wlen = MultiByteToWideChar(CP_UTF8, MB_ERR_INVALID_CHARS, buf, len, nullptr, 0);
  CHECK(wlen > 0 || len == 0);
  wchar_t* wbuf = static_cast<wchar_t*>(calloc(wlen + 1, sizeof(wchar_t)));
  CHECK(wbuf);
  CHECK(MultiByteToWideChar(CP_UTF8, MB_ERR_INVALID_CHARS, buf, len, wbuf, wlen) == wlen);
  free(buf);
  return wbuf;
}

bool PrintVariant(FILE* out, const VARIANT* value) {
  if (!value || V_VT(value) == VT_EMPTY || V_VT(value) == VT_NULL) return false;

  VARIANT tmp;
  VariantInit(&tmp);
  if (FAILED(VariantCopyInd(&tmp, const_cast<VARIANT*>(value)))) return false;
  if (FAILED(VariantChangeType(&tmp, &tmp, 0, VT_BSTR))) {
    VariantClear(&tmp);
    return false;
  }

  const BSTR text = V_BSTR(&tmp);
  if (text) {
    fwprintf(out, L"%ls", text);
  }
  VariantClear(&tmp);
  return text != nullptr;
}

// COM object exposed to JavaScript code as the global WScript object.
// Implements bare minimum to support REPL: Echo, StdOut.Write, StdIn.ReadLine, StdIn.AtEndOfStream.
class WScript : public IDispatch {
 public:
  enum { kEcho = 1, kWrite = 2, kReadLine = 3, kStdIn = 4, kStdOut = 5, kAtEndOfStream = 6 };

  WScript() : ref_(1), eof_(false) {}

  HRESULT STDMETHODCALLTYPE QueryInterface(REFIID riid, void** out) override {
    if (!out) return E_POINTER;
    *out = nullptr;
    if (IsEqualIID(riid, IID_IUnknown) || IsEqualIID(riid, IID_IDispatch)) {
      *out = static_cast<IDispatch*>(this);
      AddRef();
      return S_OK;
    }
    return E_NOINTERFACE;
  }

  ULONG STDMETHODCALLTYPE AddRef() override {
    return static_cast<ULONG>(InterlockedIncrement(&ref_));
  }

  ULONG STDMETHODCALLTYPE Release() override {
    // No delete here: WScript is stack-allocated by wmain().
    return static_cast<ULONG>(InterlockedDecrement(&ref_));
  }

  HRESULT STDMETHODCALLTYPE GetTypeInfoCount(UINT* count) override {
    if (!count) return E_POINTER;
    *count = 0;
    return S_OK;
  }

  HRESULT STDMETHODCALLTYPE GetTypeInfo(UINT, LCID, ITypeInfo**) override {
    return E_NOTIMPL;
  }

  HRESULT STDMETHODCALLTYPE GetIDsOfNames(REFIID, LPOLESTR* names, UINT count, LCID, DISPID* dispids) override {
    static const wchar_t* kProperties[] = {L"Echo", L"Write", L"ReadLine", L"StdIn", L"StdOut", L"AtEndOfStream", nullptr};
    if (!names || !dispids || count == 0) return E_INVALIDARG;

    for (UINT i = 0; i < count; i++) {
      dispids[i] = DISPID_UNKNOWN;
      for (int j = 0; kProperties[j]; j++) {
        if (lstrcmpW(names[i], kProperties[j]) == 0) {
          dispids[i] = j + 1;
          break;
        }
      }
      if (dispids[i] == DISPID_UNKNOWN) return DISP_E_UNKNOWNNAME;
    }

    return S_OK;
  }

  HRESULT STDMETHODCALLTYPE Invoke(DISPID dispid, REFIID, LCID, WORD flags, DISPPARAMS* params, VARIANT* result, EXCEPINFO*, UINT*) override {
    if (result) VariantInit(result);

    if ((flags & DISPATCH_METHOD) != 0) {
      if (dispid == kEcho) return Print(params, L'\n');
      if (dispid == kWrite) return Print(params);
      if (dispid == kReadLine) return ReadLine(result);
    }

    if ((flags & DISPATCH_PROPERTYGET) != 0) {
      if ((dispid == kStdIn || dispid == kStdOut) && result) {
        // Hack: alias WScript.StdIn/WScript.StdOut to WScript object itself.
        V_VT(result) = VT_DISPATCH;
        V_DISPATCH(result) = static_cast<IDispatch*>(this);
        AddRef();
        return S_OK;
      }

      if (dispid == kAtEndOfStream && result) {
        V_VT(result) = VT_BOOL;
        V_BOOL(result) = eof_ ? VARIANT_TRUE : VARIANT_FALSE;
        return S_OK;
      }
    }

    return DISP_E_MEMBERNOTFOUND;
  }

 private:
  HRESULT Print(DISPPARAMS* params, wchar_t terminator = 0) {
    if (params && params->cArgs != 0) {
      for (UINT i = params->cArgs; i > 0; i--) {
        PrintVariant(stdout, &params->rgvarg[i - 1]);
        if (i > 1) fwprintf(stdout, L" ");
      }
    }
    if (terminator) fwprintf(stdout, L"%lc", terminator);
    return S_OK;
  }

  HRESULT ReadLine(VARIANT* result) {
    if (!result) return E_POINTER;

    size_t len = 0, cap = 64;
    wchar_t* buf = static_cast<wchar_t*>(malloc(cap * sizeof(*buf)));
    CHECK(buf);
    wint_t c;
    while ((c = win_fgetwc(stdin)) != WEOF && c != L'\x04' /*^D*/ && c != L'\n') {
      if (c == L'\r') continue;
      if (len + 1 >= cap) {
        cap *= 2;
        buf = static_cast<wchar_t*>(realloc(buf, cap * sizeof(*buf)));
        CHECK(buf);
      }
      buf[len++] = static_cast<wchar_t>(c);
    }
    buf[len] = 0;

    VariantInit(result);
    if (len > 0 || c == L'\n') {
      V_VT(result) = VT_BSTR;
      V_BSTR(result) = SysAllocString(buf);
      free(buf);
      return V_BSTR(result) ? S_OK : E_OUTOFMEMORY;
    } else {
      eof_ = true;
      V_VT(result) = VT_EMPTY;  // undefined
      free(buf);
      return S_OK;
    }
  }

  LONG ref_;
  bool eof_;
};

// IActiveScriptSite implementation used as the engine callback sink.
class ScriptSite : public IActiveScriptSite {
 public:
  explicit ScriptSite(WScript* host) : ref_(1), host_(host) {}

  HRESULT STDMETHODCALLTYPE QueryInterface(REFIID riid, void** out) override {
    if (!out) return E_POINTER;
    *out = nullptr;
    if (IsEqualIID(riid, IID_IUnknown) || IsEqualIID(riid, IID_IActiveScriptSite)) {
      *out = static_cast<IActiveScriptSite*>(this);
      AddRef();
      return S_OK;
    }
    return E_NOINTERFACE;
  }

  ULONG STDMETHODCALLTYPE AddRef() override {
    return static_cast<ULONG>(InterlockedIncrement(&ref_));
  }

  ULONG STDMETHODCALLTYPE Release() override {
    // No delete here: ScriptSite is stack-allocated by wmain().
    return static_cast<ULONG>(InterlockedDecrement(&ref_));
  }

  HRESULT STDMETHODCALLTYPE GetLCID(LCID* out_lcid) override {
    if (!out_lcid) return E_POINTER;
    *out_lcid = LOCALE_SYSTEM_DEFAULT;
    return S_OK;
  }

  HRESULT STDMETHODCALLTYPE GetItemInfo(LPCOLESTR name, DWORD mask, IUnknown** out_item, ITypeInfo** out_typeinfo) override {
    if (out_item) *out_item = nullptr;
    if (out_typeinfo) *out_typeinfo = nullptr;

    if (name && lstrcmpW(name, L"WScript") == 0) {
      if ((mask & SCRIPTINFO_IUNKNOWN) && out_item) {
        if (!host_) return E_UNEXPECTED;
        *out_item = static_cast<IUnknown*>(host_);
        host_->AddRef();
      }
      if (mask & SCRIPTINFO_ITYPEINFO) return TYPE_E_ELEMENTNOTFOUND;
      return S_OK;
    }

    return TYPE_E_ELEMENTNOTFOUND;
  }

  HRESULT STDMETHODCALLTYPE GetDocVersionString(BSTR* out) override {
    if (!out) return E_POINTER;
    *out = SysAllocString(L"1");
    return *out ? S_OK : E_OUTOFMEMORY;
  }

  HRESULT STDMETHODCALLTYPE OnScriptTerminate(const VARIANT*, const EXCEPINFO*) override { return S_OK; }
  HRESULT STDMETHODCALLTYPE OnStateChange(SCRIPTSTATE) override { return S_OK; }
  HRESULT STDMETHODCALLTYPE OnEnterScript() override { return S_OK; }
  HRESULT STDMETHODCALLTYPE OnLeaveScript() override { return S_OK; }

  HRESULT STDMETHODCALLTYPE OnScriptError(IActiveScriptError* err) override {
    ULONG line = 0;
    err->GetSourcePosition(nullptr, &line, nullptr);
    EXCEPINFO ex = {};
    err->GetExceptionInfo(&ex);
    fwprintf(stderr, L"Error on line %lu: %ls\n", line + 1, ex.bstrDescription ? ex.bstrDescription : L"<unknown>");
    SysFreeString(ex.bstrSource);
    SysFreeString(ex.bstrDescription);
    SysFreeString(ex.bstrHelpFile);
    return S_OK;
  }

 private:
  LONG ref_;
  WScript* host_;
};

#ifdef _WIN64
typedef IActiveScriptParse64 IActiveScriptParse_t;
static const GUID kIidIActiveScriptParse = {0xc7ef7658, 0xe1ee, 0x480e, {0x97, 0xea, 0xd5, 0x2c, 0xb4, 0xd7, 0x6d, 0x17}};
#else
typedef IActiveScriptParse32 IActiveScriptParse_t;
static const GUID kIidIActiveScriptParse = {0xbb1a2ae2, 0xa4f9, 0x11cf, {0x8f, 0x20, 0x00, 0x80, 0x5f, 0x2c, 0xd0, 0x64}};
#endif

IActiveScript* InitJScript(const wchar_t* dll_path) {
  CHECK_HR(CoInitializeEx(nullptr, COINIT_APARTMENTTHREADED));

  HMODULE dll;
  if (dll_path) {
    dll = LoadLibraryW(dll_path);
    if (!dll) {
      fwprintf(stderr, L"LoadLibraryW(\"%ls\") failed (0x%.8x)\n", dll_path, GetLastError());
      exit(1);
    }
  } else {
    // Use a non-standard name to prevent Wine's fallback to its pre-built jscript.dll
#ifdef _WIN64
    dll_path = L"jscript64.dll";
#else
    dll_path = L"jscript32.dll";
#endif
    dll = LoadLibraryW(dll_path);
    if (!dll) {
      fwprintf(stderr, L"Failed to load %ls, falling back to jscript.dll\n", dll_path);
      dll = LoadLibraryW(L"jscript.dll");
      if (!dll) {
        fwprintf(stderr, L"LoadLibraryW(\"jscript.dll\") failed (0x%.8x)\n", GetLastError());
        exit(1);
      }
    }
  }

  typedef HRESULT(WINAPI* DllGetClassObjectFn)(REFCLSID, REFIID, LPVOID*);
  DllGetClassObjectFn get_cls = reinterpret_cast<DllGetClassObjectFn>(GetProcAddress(dll, "DllGetClassObject"));
  CHECK(get_cls != nullptr);

  IClassFactory* factory = nullptr;
  static const GUID kClsidJScript = {0xf414c260, 0x6ac0, 0x11cf, {0xb6, 0xd1, 0x00, 0xaa, 0x00, 0xbb, 0xbb, 0x58}};
  CHECK_HR(get_cls(kClsidJScript, IID_IClassFactory, reinterpret_cast<void**>(&factory)));

  IActiveScript* script = nullptr;
  CHECK_HR(factory->CreateInstance(nullptr, IID_IActiveScript, reinterpret_cast<void**>(&script)));
  factory->Release();
  return script;
}

bool RunScript(IActiveScriptParse_t* parser, const wchar_t* code) {
  EXCEPINFO ex = {};
  HRESULT hr = parser->ParseScriptText(code, nullptr, nullptr, nullptr, 0, 0, SCRIPTTEXT_ISVISIBLE, nullptr, &ex);
  if (FAILED(hr) && hr != (HRESULT)SCRIPT_E_REPORTED) {
    // Show error message unless already handled by OnScriptError()
    fwprintf(stderr, L"ParseScriptText failed (hr=0x%08lx ex.scode=0x%08lx)%ls%ls\n",
             static_cast<unsigned long>(hr),
             static_cast<unsigned long>(ex.scode),
             ex.bstrDescription ? L": " : L"",
             ex.bstrDescription ? ex.bstrDescription : L"");
  }
  SysFreeString(ex.bstrSource);
  SysFreeString(ex.bstrDescription);
  SysFreeString(ex.bstrHelpFile);
  return SUCCEEDED(hr);
}

static const wchar_t kInitCode[] = LR"(
  function print() { WScript.Echo('' + Array.prototype.join.call(arguments, ' ')); };
  var console = { log: print };
)";

static const wchar_t kVersionCode[] = LR"(
  WScript.Echo(ScriptEngineMajorVersion() + '.' + ScriptEngineMinorVersion() + '.' + ScriptEngineBuildVersion());
)";

#include "kReplCode.inc"

}  // namespace

int wmain(int argc, wchar_t** argv) {
  const wchar_t* dll_path = nullptr;
  int first_script_arg = -1;
  bool show_version = false;

  for (int i = 1; i < argc; i++) {
    if (lstrcmpiW(argv[i], L"--help") == 0 || lstrcmpiW(argv[i], L"-h") == 0) {
      fwprintf(stderr, L"Usage: jscript.exe [--dll jscript.dll] [--version] [script.js ...]\n");
      return 0;
    } else if (lstrcmpiW(argv[i], L"--dll") == 0 && i + 1 < argc) {
      dll_path = argv[++i];
    } else if (lstrcmpiW(argv[i], L"--version") == 0) {
      show_version = true;
    } else {
      first_script_arg = i;
      break;
    }
  }

  IActiveScript* script = InitJScript(dll_path);
  IActiveScriptParse_t* parser = nullptr;
  CHECK_HR(script->QueryInterface(kIidIActiveScriptParse, (void**)&parser));

  WScript wscript;
  ScriptSite site(&wscript);
  CHECK_HR(script->SetScriptSite(&site));
  CHECK_HR(parser->InitNew());
  CHECK_HR(script->AddNamedItem(L"WScript", SCRIPTITEM_ISVISIBLE));
  CHECK_HR(script->SetScriptState(SCRIPTSTATE_STARTED));
  CHECK(RunScript(parser, kInitCode));

  bool ok = true;
  if (show_version) {
    ok = RunScript(parser, kVersionCode);
  } else if (first_script_arg == -1) {
    ok = RunScript(parser, kReplCode);
  } else {
    for (int i = first_script_arg; i < argc && ok; i++) {
      wchar_t* code = ReadFileUtf8(argv[i]);
      ok = RunScript(parser, code);
      free(code);
    }
  }

  exit(ok ? 0 : 1);
}
