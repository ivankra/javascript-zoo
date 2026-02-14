// Standalone host executable for Microsoft/Wine's jscript.dll.
// Implements basic REPL and script runner.
// Exposes a minimal WScript object to JavaScript code to support REPL.
//
// Usage: jscript.exe [--dll jscript.dll] [--version] [script.js ...]

#include <activscp.h>
#include <ole2.h>
#include <oleauto.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <wchar.h>
#include <windows.h>

namespace {

static void PrintWideUtf8(FILE* out, const WCHAR* s) {
  if (!s) return;
  int n = WideCharToMultiByte(CP_UTF8, 0, s, -1, nullptr, 0, nullptr, nullptr);
  if (n <= 1) return;
  char* buf = static_cast<char*>(malloc(static_cast<size_t>(n)));
  if (!buf) return;
  if (WideCharToMultiByte(CP_UTF8, 0, s, -1, buf, n, nullptr, nullptr) > 0) fputs(buf, out);
  free(buf);
}

static BOOL PrintVariant(const VARIANT* v) {
  if (!v || V_VT(v) == VT_EMPTY || V_VT(v) == VT_NULL) return FALSE;
  VARIANT tmp;
  VariantInit(&tmp);
  if (FAILED(VariantCopyInd(&tmp, const_cast<VARIANT*>(v)))) return FALSE;
  if (FAILED(VariantChangeType(&tmp, &tmp, 0, VT_BSTR))) {
    VariantClear(&tmp);
    return FALSE;
  }
  BSTR text = SysAllocString(V_BSTR(&tmp));
  VariantClear(&tmp);
  if (!text) return FALSE;
  PrintWideUtf8(stdout, text);
  SysFreeString(text);
  return TRUE;
}

static WCHAR* ReadUtf8File(const WCHAR* path) {
  HANDLE h = CreateFileW(path, GENERIC_READ, FILE_SHARE_READ, nullptr, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, nullptr);
  if (h == INVALID_HANDLE_VALUE) return nullptr;

  DWORD n = GetFileSize(h, nullptr);
  if (n == INVALID_FILE_SIZE) {
    CloseHandle(h);
    return nullptr;
  }

  char* bytes = static_cast<char*>(malloc(static_cast<size_t>(n) + 1));
  if (!bytes) {
    CloseHandle(h);
    return nullptr;
  }

  DWORD got = 0;
  BOOL ok = ReadFile(h, bytes, n, &got, nullptr);
  CloseHandle(h);
  if (!ok || got != n) {
    free(bytes);
    return nullptr;
  }
  bytes[n] = 0;

  const char* data = bytes;
  if (n >= 3 && static_cast<unsigned char>(bytes[0]) == 0xEF &&
      static_cast<unsigned char>(bytes[1]) == 0xBB &&
      static_cast<unsigned char>(bytes[2]) == 0xBF) {
    data += 3;
    n -= 3;
  }

  int wlen = MultiByteToWideChar(CP_UTF8, MB_ERR_INVALID_CHARS, data, static_cast<int>(n), nullptr, 0);
  if (wlen <= 0) {
    free(bytes);
    return nullptr;
  }
  WCHAR* out = static_cast<WCHAR*>(calloc(static_cast<size_t>(wlen) + 1, sizeof(WCHAR)));
  if (!out) {
    free(bytes);
    return nullptr;
  }
  if (MultiByteToWideChar(CP_UTF8, MB_ERR_INVALID_CHARS, data, static_cast<int>(n), out, wlen) != wlen) {
    free(bytes);
    free(out);
    return nullptr;
  }
  free(bytes);
  return out;
}

[[noreturn]] static void hexit(const char* message, HRESULT hr) {
  fprintf(stderr, "%s: error 0x%08lx\n", message, static_cast<unsigned long>(hr));
  exit(1);
}

// COM object exposed to JavaScript code as the global WScript object.
// Implements bare minimum to support REPL: Echo, StdOut.Write, StdIn.ReadLine, StdIn.AtEndOfStream.
class WScript : public IDispatch {
 public:
  enum { kEcho = 1, kWrite = 2, kReadLine = 3, kStdIn = 4, kStdOut = 5, kAtEndOfStream = 6 };

  WScript() : ref_(1) {}

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
    LONG refs = InterlockedDecrement(&ref_);
    // No delete here: WScript is stack-allocated by wmain().
    return static_cast<ULONG>(refs);
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
    static const WCHAR* kProperties[] = {L"Echo", L"Write", L"ReadLine", L"StdIn", L"StdOut", L"AtEndOfStream", nullptr};
    if (!names || !dispids || count == 0) return E_INVALIDARG;
    for (UINT i = 0; i < count; ++i) {
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
      if (dispid == kEcho) return Print(params, '\n');
      if (dispid == kWrite) return Print(params);
      if (dispid == kReadLine) return ReadLine(result);
    }
    if ((flags & DISPATCH_PROPERTYGET) != 0) {
      if ((dispid == kStdIn || dispid == kStdOut) && result) {
        // Hack: return reference to itself to avoid implementing extra objects.
        V_VT(result) = VT_DISPATCH;
        V_DISPATCH(result) = static_cast<IDispatch*>(this);
        AddRef();
        return S_OK;
      }
      if (dispid == kAtEndOfStream && result) {
        V_VT(result) = VT_BOOL;
        V_BOOL(result) = IsAtEndOfStream() ? VARIANT_TRUE : VARIANT_FALSE;
        return S_OK;
      }
    }
    return DISP_E_MEMBERNOTFOUND;
  }

 private:
  HRESULT Print(DISPPARAMS* params, char terminator = 0) {
    if (params && params->cArgs) {
      for (UINT i = params->cArgs; i > 0; --i) {
        if (PrintVariant(&params->rgvarg[i - 1]) && i > 1) putchar(' ');
      }
    }
    if (terminator) putchar(terminator);
    fflush(stdout);
    return S_OK;
  }

  HRESULT ReadLine(VARIANT* result) {
    if (!result) return E_POINTER;
    VariantInit(result);

    WCHAR line[8192];
    if (!fgetws(line, static_cast<int>(sizeof(line) / sizeof(line[0])), stdin)) {
      V_VT(result) = VT_NULL;
      return S_OK;
    }

    size_t len = wcscspn(line, L"\r\n");
    line[len] = 0;
    V_VT(result) = VT_BSTR;
    V_BSTR(result) = SysAllocString(line);
    return V_BSTR(result) ? S_OK : E_OUTOFMEMORY;
  }

  BOOL IsAtEndOfStream() {
    wint_t ch = fgetwc(stdin);
    if (ch == WEOF) return TRUE;
    if (ungetwc(ch, stdin) == WEOF) return TRUE;
    return FALSE;
  }

  LONG ref_;
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
    LONG refs = InterlockedDecrement(&ref_);
    // No delete here: ScriptSite is stack-allocated by wmain().
    return static_cast<ULONG>(refs);
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

  HRESULT STDMETHODCALLTYPE OnScriptTerminate(const VARIANT*, const EXCEPINFO*) override {
    return S_OK;
  }

  HRESULT STDMETHODCALLTYPE OnStateChange(SCRIPTSTATE) override {
    return S_OK;
  }

  HRESULT STDMETHODCALLTYPE OnScriptError(IActiveScriptError* err) override {
    if (!err) return S_OK;
    EXCEPINFO ex = {};
    DWORD ctx = 0;
    ULONG line = 0;
    LONG col = 0;
    err->GetSourcePosition(&ctx, &line, &col);
    err->GetExceptionInfo(&ex);
    fprintf(stderr, "Line %lu: ", static_cast<unsigned long>(line + 1));
    if (ex.bstrDescription) PrintWideUtf8(stderr, ex.bstrDescription);
    fputc('\n', stderr);
    SysFreeString(ex.bstrSource);
    SysFreeString(ex.bstrDescription);
    SysFreeString(ex.bstrHelpFile);
    return S_OK;
  }

  HRESULT STDMETHODCALLTYPE OnEnterScript() override { return S_OK; }
  HRESULT STDMETHODCALLTYPE OnLeaveScript() override { return S_OK; }

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

static bool Eval(IActiveScriptParse_t* script_parse, const WCHAR* code) {
  if (!script_parse || !code) return false;
  EXCEPINFO ex = {};
  HRESULT hr = script_parse->ParseScriptText(code, nullptr, nullptr, nullptr, 0, 0, SCRIPTTEXT_ISVISIBLE, nullptr, &ex);
  if (FAILED(hr)) {
    fprintf(stderr, "Eval failed: 0x%08lx", static_cast<unsigned long>(hr));
    if (ex.bstrDescription) {
      fputs(": ", stderr);
      PrintWideUtf8(stderr, ex.bstrDescription);
    } else if (ex.scode != S_OK) {
      fprintf(stderr, " (scode=0x%08lx)", static_cast<unsigned long>(ex.scode));
    }
    fputc('\n', stderr);
  }
  SysFreeString(ex.bstrSource);
  SysFreeString(ex.bstrDescription);
  SysFreeString(ex.bstrHelpFile);
  return SUCCEEDED(hr);
}

static const WCHAR kInitCode[] = LR"(
  function print() { WScript.Echo('' + Array.prototype.join.call(arguments, ' ')); };
  var console = { log: print };
)";

static const WCHAR kVersionCode[] = LR"(
  WScript.Echo(ScriptEngineMajorVersion() + "." + ScriptEngineMinorVersion() + "." + ScriptEngineBuildVersion());
)";

static const WCHAR kReplCode[] = LR"(
  // JSON.stringify() polyfill
  var __stringify = (function() {
    var esc = {'"':'\\"','\\':'\\\\','\b':'\\b','\f':'\\f','\n':'\\n','\r':'\\r','\t':'\\t'};
    var ts = Object.prototype.toString;

    function str(s) {
      for (var r = '"', i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        r += esc[c] || (c < ' ' ? '\\u' + ('000' + c.charCodeAt(0).toString(16)).slice(-4) : c);
      }
      return r + '"';
    }

    function go(v, seen) {
      if (v === null) return 'null';
      var t = typeof v;
      if (t === 'string') return str(v);
      if (t === 'boolean') return v ? 'true' : 'false';
      if (t === 'number') return isFinite(v) ? '' + v : 'null';
      if (t !== 'object') return;

      for (var i = 0; i < seen.length; i++) if (seen[i] === v) throw new TypeError('Circular');
      seen.push(v);

      var out = [], isArr = ts.call(v) === '[object Array]';
      if (isArr) {
        for (var j = 0; j < v.length; j++) {
          var x = go(v[j], seen);
          out.push(x === undefined ? 'null' : x);
        }
      } else {
        for (var k in v) if (v.hasOwnProperty(k)) {
          var y = go(v[k], seen);
          if (y !== undefined) out.push(str(k) + ':' + y);
        }
      }
      seen.pop();
      return isArr ? '[' + out + ']' : '{' + out + '}';
    }

    return function(v) { return go(v, []); };
  })();

  (function() {
    while (true) {
      WScript.StdOut.Write("> ");
      if (WScript.StdIn.AtEndOfStream) break;

      var __line = WScript.StdIn.ReadLine().replace(/^\s+|\s+$/g, "");
      if (__line === "exit" || __line === "quit" || __line == "\x04" /*^D*/) break;
      if (__line === "") continue;

      try {
        var __res = eval(__line);
        if (typeof __res !== "undefined") {
          WScript.Echo(typeof __res === "object" ? __stringify(__res) : __res);
        }
      } catch (__err) {
        var __name = __err && __err.name;
        var __msg = __err && __err.message;
        WScript.Echo("Uncaught " + (__name ? __name + ": " : "") + (__msg || __err));
      }
    }
  })();
)";

}  // namespace

int wmain(int argc, WCHAR** argv) {
  const WCHAR* dll_path = nullptr;
  int first_script_arg = -1;
  bool show_version = false;

  for (int i = 1; i < argc; ++i) {
    if (lstrcmpW(argv[i], L"--help") == 0 || lstrcmpW(argv[i], L"-h") == 0) {
      puts("Usage: jscript.exe [--dll jscript.dll] [--version] [script.js ...]\n");
      return 0;
    } else if (lstrcmpW(argv[i], L"--dll") == 0 && i + 1 < argc) {
      dll_path = argv[++i];
    } else if (lstrcmpW(argv[i], L"--version") == 0) {
      show_version = true;
    } else {
      first_script_arg = i;
      break;
    }
  }

  HRESULT hr = CoInitializeEx(nullptr, COINIT_APARTMENTTHREADED);
  if (FAILED(hr)) hexit("CoInitializeEx failed", hr);

  HMODULE dll_handle = nullptr;
  IActiveScript* active_script = nullptr;
  IActiveScriptParse_t* script_parse = nullptr;
  WScript wscript;
  ScriptSite script_site(&wscript);

  if (dll_path && *dll_path) {
    dll_handle = LoadLibraryW(dll_path);
  } else {
#ifdef _WIN64
    dll_handle = LoadLibraryW(L"jscript_win64.dll");
#else
    dll_handle = LoadLibraryW(L"jscript_win32.dll");
#endif
    if (!dll_handle) {
      fprintf(stderr, "Failed to load jscript_win32.dll/jscript_win64.dll, falling back to jscript.dll\n");
      dll_handle = LoadLibraryW(L"jscript.dll");
    }
  }

  if (!dll_handle) hexit("LoadLibraryW", HRESULT_FROM_WIN32(GetLastError()));

  typedef HRESULT(WINAPI* DllGetClassObjectFn)(REFCLSID, REFIID, LPVOID*);
  DllGetClassObjectFn get_cls = reinterpret_cast<DllGetClassObjectFn>(GetProcAddress(dll_handle, "DllGetClassObject"));
  if (!get_cls) hexit("GetProcAddress(DllGetClassObject)", HRESULT_FROM_WIN32(GetLastError()));
  IClassFactory* class_factory = nullptr;
  static const GUID kClsidJScript = {0xf414c260, 0x6ac0, 0x11cf, {0xb6, 0xd1, 0x00, 0xaa, 0x00, 0xbb, 0xbb, 0x58}};
  hr = get_cls(kClsidJScript, IID_IClassFactory, reinterpret_cast<void**>(&class_factory));
  if (FAILED(hr)) hexit("DllGetClassObject", hr);
  hr = class_factory->CreateInstance(nullptr, IID_IActiveScript, reinterpret_cast<void**>(&active_script));
  class_factory->Release();
  if (FAILED(hr)) hexit("IClassFactory::CreateInstance", hr);
  hr = active_script->QueryInterface(kIidIActiveScriptParse, reinterpret_cast<void**>(&script_parse));
  if (FAILED(hr)) hexit("QueryInterface", hr);
  hr = active_script->SetScriptSite(&script_site);
  if (FAILED(hr)) hexit("IActiveScript::SetScriptSite", hr);
  hr = script_parse->InitNew();
  if (FAILED(hr)) hexit("IActiveScriptParse::InitNew", hr);
  hr = active_script->AddNamedItem(L"WScript", SCRIPTITEM_ISVISIBLE);
  if (FAILED(hr)) hexit("IActiveScript::AddNamedItem", hr);
  hr = active_script->SetScriptState(SCRIPTSTATE_STARTED);
  if (FAILED(hr)) hexit("IActiveScript::SetScriptState", hr);

  if (!Eval(script_parse, kInitCode)) exit(1);

  if (show_version) {
    if (!Eval(script_parse, kVersionCode)) exit(1);
  } else if (first_script_arg >= 0) {
    for (int i = first_script_arg; i < argc; ++i) {
      const WCHAR* script_path = argv[i];
      WCHAR* code = ReadUtf8File(script_path);
      if (!code) {
        fputs("Failed to read file: ", stderr);
        PrintWideUtf8(stderr, script_path);
        fputc('\n', stderr);
        exit(1);
      }
      if (!Eval(script_parse, code)) {
        free(code);
        exit(1);
      }
      free(code);
    }
  } else {
    if (!Eval(script_parse, kReplCode)) exit(1);
  }
  exit(0);
}
