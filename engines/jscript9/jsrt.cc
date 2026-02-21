// Standalone DLL host for JSRT API engines (JScript9/Chakra/ChakraCore).
// Implements REPL and script runner.
//
// Legacy (IE9-11's jscript9.dll) and Edge (chakra.dll/chakracore.dll) JSRT API
// flavors are both supported, autodetected based on DLL name.
//
// Usage: jsrt.exe [--dll jscript9.dll] [--jitless] [--legacy/--edge] [--version] [script.js ...]
//
// References:
//   * https://blogs.windows.com/msedgedev/2015/05/18/using-chakra-for-scripting-applications-across-windows-10/
//   * https://github.com/chakra-core/ChakraCore/blob/master/lib/Jsrt/ChakraCommon.h
//
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

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

typedef void* JsRuntimeHandle;
typedef void* JsRef;
typedef JsRef JsContextRef;
typedef JsRef JsValueRef;
typedef JsRef JsPropertyIdRef;
typedef DWORD_PTR JsSourceContext;

const JsSourceContext JS_SOURCE_CONTEXT_NONE = (JsSourceContext)-1;

enum JsErrorCode { JsNoError = 0, JsErrorScriptException = 0x30001, JsErrorScriptCompile = 0x30002 };
enum JsRuntimeAttributes { JsRuntimeAttributeNone = 0, JsRuntimeAttributeDisableNativeCodeGeneration = 8 };
enum JsValueType { JsUndefined = 0, JsNull = 1, /*...*/ };
enum JsRuntimeVersion { JsRuntimeVersion10 = 0, JsRuntimeVersion11 = 1, JsRuntimeVersionEdge = -1 };  // IE10/11/latest

typedef void(CALLBACK* JsBackgroundWorkItemCallback)(void* callbackState);
typedef bool(CALLBACK* JsThreadServiceCallback)(JsBackgroundWorkItemCallback callback, void* callbackState);
typedef JsValueRef(CALLBACK* JsNativeFunction)(JsValueRef callee, bool isConstructCall, JsValueRef* arguments, unsigned short argumentCount, void* callbackState);

// Loads JScript9/Chakra DLL and resolves JSRT API symbols.
struct API {
  HMODULE dll = nullptr;
  bool legacy = false;    // true if Legacy JSRT API, else Edge JSRT API

  JsErrorCode(STDAPICALLTYPE* JsCreateRuntime_legacy)(JsRuntimeAttributes, JsRuntimeVersion, JsThreadServiceCallback, JsRuntimeHandle*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsCreateRuntime_edge)(JsRuntimeAttributes, JsThreadServiceCallback, JsRuntimeHandle*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsCreateContext_legacy)(JsRuntimeHandle, void*, JsContextRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsCreateContext_edge)(JsRuntimeHandle, JsContextRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsConvertValueToString)(JsValueRef, JsValueRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsCreateFunction)(JsNativeFunction, void*, JsValueRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsCreateObject)(JsValueRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsGetAndClearException)(JsValueRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsGetGlobalObject)(JsValueRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsGetPropertyIdFromName)(const wchar_t*, JsPropertyIdRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsGetUndefinedValue)(JsValueRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsPointerToString)(const wchar_t*, size_t, JsValueRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsRunScript)(const wchar_t*, JsSourceContext, const wchar_t*, JsValueRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsSetCurrentContext)(JsContextRef) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsSetProperty)(JsValueRef, JsPropertyIdRef, JsValueRef, bool) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsStringToPointer)(JsValueRef, const wchar_t**, size_t*) = nullptr;

  API(const wchar_t* dll_path, bool legacy) : legacy(legacy) {
    dll = LoadLibraryW(dll_path);
    if (!dll) {
      fwprintf(stderr, L"LoadLibraryW(\"%ls\") failed (0x%.8x)\n", dll_path, GetLastError());
      exit(1);
    }
    if (legacy) {
      Resolve(JsCreateRuntime_legacy, "JsCreateRuntime");
      Resolve(JsCreateContext_legacy, "JsCreateContext");
    } else {
      Resolve(JsCreateRuntime_edge, "JsCreateRuntime");
      Resolve(JsCreateContext_edge, "JsCreateContext");
    }
    Resolve(JsConvertValueToString, "JsConvertValueToString");
    Resolve(JsCreateFunction, "JsCreateFunction");
    Resolve(JsCreateObject, "JsCreateObject");
    Resolve(JsGetAndClearException, "JsGetAndClearException");
    Resolve(JsGetGlobalObject, "JsGetGlobalObject");
    Resolve(JsGetPropertyIdFromName, "JsGetPropertyIdFromName");
    Resolve(JsGetUndefinedValue, "JsGetUndefinedValue");
    Resolve(JsPointerToString, "JsPointerToString");
    Resolve(JsRunScript, "JsRunScript");
    Resolve(JsSetCurrentContext, "JsSetCurrentContext");
    Resolve(JsSetProperty, "JsSetProperty");
    Resolve(JsStringToPointer, "JsStringToPointer");
  }

  JsValueRef undefined() const { JsValueRef u; CHECK(JsGetUndefinedValue(&u) == JsNoError); return u; }

 private:
  template <typename T> void Resolve(T& res, const char* symbol) {
    FARPROC addr = GetProcAddress(dll, symbol);
    if (!addr) {
      fwprintf(stderr, L"GetProcAddress for \"%hs\" failed\n", symbol);
      exit(1);
    }
    memcpy(&res, &addr, sizeof(res));
  }
};

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

void PrintJsValue(FILE* fp, const API& api, JsValueRef value, wchar_t terminator = 0) {
  JsValueRef str = nullptr;
  const wchar_t* buf = nullptr;
  size_t len = 0;
  if (api.JsConvertValueToString(value, &str) == JsNoError && api.JsStringToPointer(str, &buf, &len) == JsNoError) {
    fwprintf(fp, L"%.*ls", static_cast<int>(len), buf);
  }
  if (terminator) {
    fwprintf(fp, L"%lc", terminator);
  }
}

JsValueRef PrintJsValues(JsValueRef* argv, unsigned short argc, void* state, wchar_t terminator = 0) {
  const API* api = reinterpret_cast<const API*>(state);
  CHECK(api);
  for (unsigned short i = 1; i < argc; i++) {
    PrintJsValue(stdout, *api, argv[i], i + 1 == argc ? terminator : L' ');
  }
  return api->undefined();
}

JsValueRef CALLBACK PrintCallback(JsValueRef, bool, JsValueRef* argv, unsigned short argc, void* state) {
  return PrintJsValues(argv, argc, state, L'\n');
}

JsValueRef CALLBACK WriteCallback(JsValueRef, bool, JsValueRef* argv, unsigned short argc, void* state) {
  return PrintJsValues(argv, argc, state);
}

JsValueRef CALLBACK ReadLineCallback(JsValueRef, bool, JsValueRef*, unsigned short, void* state) {
  const API* api = reinterpret_cast<const API*>(state);
  CHECK(api);
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
  JsValueRef res = api->undefined();
  if (len > 0 || c == L'\n') {
    buf[len] = 0;
    CHECK(api->JsPointerToString(buf, len, &res) == JsNoError);
  }
  free(buf);
  return res;
}

void InitRuntime(const API& api, bool jitless) {
  JsRuntimeHandle runtime = nullptr;
  JsContextRef context = nullptr;
  JsRuntimeAttributes attrs = jitless ? JsRuntimeAttributeDisableNativeCodeGeneration : JsRuntimeAttributeNone;
  if (api.legacy) {
    CHECK((api.JsCreateRuntime_legacy(attrs, JsRuntimeVersionEdge, nullptr, &runtime) == JsNoError ||
           api.JsCreateRuntime_legacy(attrs, JsRuntimeVersion11, nullptr, &runtime) == JsNoError ||
           api.JsCreateRuntime_legacy(attrs, JsRuntimeVersion10, nullptr, &runtime) == JsNoError) && runtime);
    CHECK(api.JsCreateContext_legacy(runtime, nullptr, &context) == JsNoError && context);
  } else {
    CHECK(api.JsCreateRuntime_edge(attrs, nullptr, &runtime) == JsNoError && runtime);
    CHECK(api.JsCreateContext_edge(runtime, &context) == JsNoError && context);
  }
  CHECK(api.JsSetCurrentContext(context) == JsNoError);
}

void SetProp(const API& api, JsValueRef obj, const wchar_t* name, JsValueRef value) {
  JsPropertyIdRef id = nullptr;
  CHECK(api.JsGetPropertyIdFromName(name, &id) == JsNoError && id);
  CHECK(api.JsSetProperty(obj, id, value, true) == JsNoError);
}

// Add WScript object with I/O methods for REPL
void InitGlobals(const API& api) {
  JsValueRef global, wscript, stdin_obj, stdout_obj;
  CHECK(api.JsGetGlobalObject(&global) == JsNoError);
  CHECK(api.JsCreateObject(&wscript) == JsNoError);
  CHECK(api.JsCreateObject(&stdin_obj) == JsNoError);
  CHECK(api.JsCreateObject(&stdout_obj) == JsNoError);

  JsValueRef print, write, readline;
  CHECK(api.JsCreateFunction(&PrintCallback, const_cast<API*>(&api), &print) == JsNoError);
  CHECK(api.JsCreateFunction(&WriteCallback, const_cast<API*>(&api), &write) == JsNoError);
  CHECK(api.JsCreateFunction(&ReadLineCallback, const_cast<API*>(&api), &readline) == JsNoError);

  SetProp(api, global, L"WScript", wscript);
  SetProp(api, wscript, L"Echo", print);
  SetProp(api, wscript, L"StdIn", stdin_obj);
  SetProp(api, wscript, L"StdOut", stdout_obj);
  SetProp(api, stdin_obj, L"ReadLine", readline);
  SetProp(api, stdout_obj, L"Write", write);
}

bool RunScript(const API& api, const wchar_t* code) {
  JsValueRef out;
  JsErrorCode err = api.JsRunScript(code, JS_SOURCE_CONTEXT_NONE, L"", &out);
  if (err != 0) {
    JsValueRef ex = nullptr;
    if (err == JsErrorScriptCompile) {
      fwprintf(stderr, L"Compile error\n");
    } else if (err == JsErrorScriptException && api.JsGetAndClearException(&ex) == 0 && ex) {
      fwprintf(stderr, L"Uncaught ");
      PrintJsValue(stderr, api, ex, L'\n');
    } else {
      fwprintf(stderr, L"JsRunScript failed (0x%08x)\n", err);
    }
    return false;
  }
  return true;
}

static const wchar_t kInitCode[] = LR"(
  function print() { WScript.Echo('' + Array.prototype.join.call(arguments, ' ')); };
  var console = { log: print };
)";

static const wchar_t kVersionCode[] = LR"(
  WScript.Echo(ScriptEngineMajorVersion() + '.' + ScriptEngineMinorVersion() + '.' + ScriptEngineBuildVersion());
)";

// Reuses engines/jscript/repl.js
#include "kReplCode.inc"

}  // namespace

int wmain(int argc, wchar_t** argv) {
  const wchar_t* dll_path = L"jscript9.dll";
  int first_script_arg = -1;
  int legacy = -1;
  bool show_version = false;
  bool jitless = false;

  for (int i = 1; i < argc; i++) {
    if (lstrcmpiW(argv[i], L"--help") == 0 || lstrcmpiW(argv[i], L"-h") == 0) {
      fwprintf(stderr, L"Usage: jsrt.exe [--dll jscript9.dll] [--jitless] [--legacy/--edge] [--version] [script.js ...]\n");
      return 0;
    } else if (lstrcmpiW(argv[i], L"--dll") == 0 && i + 1 < argc) {
      dll_path = argv[++i];
    } else if (lstrcmpiW(argv[i], L"--version") == 0) {
      show_version = true;
    } else if (lstrcmpiW(argv[i], L"--jitless") == 0 || lstrcmpiW(argv[i], L"--no-jit") == 0) {
      jitless = true;
    } else if (lstrcmpiW(argv[i], L"--legacy") == 0) {
      legacy = 1;
    } else if (lstrcmpiW(argv[i], L"--edge") == 0) {
      legacy = 0;
    } else {
      first_script_arg = i;
      break;
    }
  }

  if (legacy == -1) {
    const int len = lstrlenW(dll_path);
    legacy = len >= 12 && lstrcmpiW(dll_path + len - 12, L"jscript9.dll") == 0;
  }

  API api(dll_path, legacy);
  InitRuntime(api, jitless);
  InitGlobals(api);
  CHECK(RunScript(api, kInitCode));

  bool ok = true;
  if (show_version) {
    ok = RunScript(api, kVersionCode);
  } else if (first_script_arg == -1) {
    ok = RunScript(api, kReplCode);
  } else {
    for (int i = first_script_arg; i < argc && ok; i++) {
      wchar_t* code = ReadFileUtf8(argv[i]);
      ok &= RunScript(api, code);
      free(code);
    }
  }

  exit(ok ? 0 : 1);
}
