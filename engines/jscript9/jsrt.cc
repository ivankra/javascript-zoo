// Standalone host executable for JSRT API engines (JScript9/Chakra/ChakraCore).
// Implements basic REPL and script runner.
//
// Legacy (jscript9.dll in IE9-11) and Edge (chakra.dll/ChakraCore.dll) JSRT API
// flavors are both supported and autodetected based on DLL name.
//
// References:
//   * https://blogs.windows.com/msedgedev/2015/05/18/using-chakra-for-scripting-applications-across-windows-10/
//   * https://github.com/chakra-core/ChakraCore/blob/master/lib/Jsrt/ChakraCommon.h
//
// Usage: jsrt.exe [--dll jscript9.dll] [--jitless] [--version] [script.js ...]
//
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

#include <windows.h>

#include <cstdarg>
#include <cwchar>
#include <cstring>
#include <cstdio>
#include <cstdlib>

namespace {

[[noreturn]] void fatal(const char* fmt, ...) {
  va_list ap;
  va_start(ap, fmt);
  vfprintf(stderr, fmt, ap);
  va_end(ap);
  fputc('\n', stderr);
  exit(1);
}

#define CHECK(cond) do { if (!(cond)) { fatal("CHECK(\"%s\") failed\n", #cond); } } while(0)

bool endswith_iW(const wchar_t* str, const wchar_t* suffix) {
  const int n = lstrlenW(str), m = lstrlenW(suffix);
  return n >= m && lstrcmpiW(str + n - m, suffix) == 0;
}

typedef void* JsRuntimeHandle;
typedef void* JsRef;
typedef JsRef JsContextRef;
typedef JsRef JsValueRef;
typedef JsRef JsPropertyIdRef;
typedef DWORD_PTR JsSourceContext;

const JsSourceContext JS_SOURCE_CONTEXT_NONE = (JsSourceContext)-1;

enum JsErrorCode {
  JsNoError = 0,
  JsErrorScriptException = 0x30001,
  JsErrorScriptCompile = 0x30002,
};

enum JsRuntimeAttributes {
  JsRuntimeAttributeNone = 0,
  JsRuntimeAttributeDisableNativeCodeGeneration = 8,
};

enum JsValueType { JsUndefined = 0, JsNull = 1, /*...*/ };

enum JsRuntimeVersion {
  JsRuntimeVersion10 = 0,     // IE10
  JsRuntimeVersion11 = 1,     // IE11
  JsRuntimeVersionEdge = -1,  // Edge/latest
};

typedef void(CALLBACK* JsBackgroundWorkItemCallback)(void* callbackState);
typedef bool(CALLBACK* JsThreadServiceCallback)(JsBackgroundWorkItemCallback callback, void* callbackState);
typedef JsValueRef(CALLBACK* JsNativeFunction)(JsValueRef callee, bool isConstructCall, JsValueRef* arguments, unsigned short argumentCount, void* callbackState);

// Loads JScript9/Chakra DLL and resolves JSRT API symbols.
struct API {
  HMODULE dll = nullptr;
  bool edge = false;      // true if Edge JSRT API, else Legacy JSRT API

  JsErrorCode(STDAPICALLTYPE* JsCreateRuntime_edge)(JsRuntimeAttributes, JsThreadServiceCallback, JsRuntimeHandle*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsCreateRuntime_legacy)(JsRuntimeAttributes, JsRuntimeVersion, JsThreadServiceCallback, JsRuntimeHandle*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsCreateContext_edge)(JsRuntimeHandle, JsContextRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsCreateContext_legacy)(JsRuntimeHandle, void*, JsContextRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsSetCurrentContext)(JsContextRef) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsRunScript)(const wchar_t*, JsSourceContext, const wchar_t*, JsValueRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsPointerToString)(const wchar_t*, size_t, JsValueRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsConvertValueToString)(JsValueRef, JsValueRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsStringToPointer)(JsValueRef, const wchar_t**, size_t*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsGetUndefinedValue)(JsValueRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsCreateFunction)(JsNativeFunction, void*, JsValueRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsGetGlobalObject)(JsValueRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsCreateObject)(JsValueRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsGetPropertyIdFromName)(const wchar_t*, JsPropertyIdRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsSetProperty)(JsValueRef, JsPropertyIdRef, JsValueRef, bool) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsGetAndClearException)(JsValueRef*) = nullptr;

  explicit API(const wchar_t* dll_path) {
    dll = LoadLibraryW(dll_path);
    if (!dll) {
      fwprintf(stderr, L"LoadLibraryW(\"%ls\") failed", dll_path);
      exit(1);
    }
    edge = !endswith_iW(dll_path, L"jscript9.dll");
    if (edge) {
      Resolve(JsCreateRuntime_edge, "JsCreateRuntime");
      Resolve(JsCreateContext_edge, "JsCreateContext");
    } else {
      Resolve(JsCreateRuntime_legacy, "JsCreateRuntime");
      Resolve(JsCreateContext_legacy, "JsCreateContext");
    }
    Resolve(JsSetCurrentContext, "JsSetCurrentContext");
    Resolve(JsRunScript, "JsRunScript");
    Resolve(JsPointerToString, "JsPointerToString");
    Resolve(JsConvertValueToString, "JsConvertValueToString");
    Resolve(JsStringToPointer, "JsStringToPointer");
    Resolve(JsGetUndefinedValue, "JsGetUndefinedValue");
    Resolve(JsCreateFunction, "JsCreateFunction");
    Resolve(JsGetGlobalObject, "JsGetGlobalObject");
    Resolve(JsCreateObject, "JsCreateObject");
    Resolve(JsGetPropertyIdFromName, "JsGetPropertyIdFromName");
    Resolve(JsSetProperty, "JsSetProperty");
    Resolve(JsGetAndClearException, "JsGetAndClearException");
  }

  JsValueRef undefined() const { JsValueRef u; CHECK(JsGetUndefinedValue(&u) == JsNoError); return u; }

 private:
  template <typename T> void Resolve(T& fn, const char* symbol) {
    fn = reinterpret_cast<T>(GetProcAddress(dll, symbol));
    if (!fn) fatal("GetProcAddress(dll, \"%s\") failed", symbol);
  }
};

wchar_t* Utf8ToWideDup(const char* in) {
  if (!in) return nullptr;
  int n = MultiByteToWideChar(CP_UTF8, 0, in, -1, nullptr, 0);
  if (n <= 0) return nullptr;
  wchar_t* out = static_cast<wchar_t*>(malloc(static_cast<size_t>(n) * sizeof(wchar_t)));
  if (!out) return nullptr;
  if (MultiByteToWideChar(CP_UTF8, 0, in, -1, out, n) <= 0) {
    free(out);
    return nullptr;
  }
  return out;
}

char* WideToUtf8Dup(const wchar_t* in, size_t in_len) {
  if (!in) return nullptr;
  int n = WideCharToMultiByte(CP_UTF8, 0, in, static_cast<int>(in_len), nullptr, 0, nullptr, nullptr);
  if (n <= 0) return nullptr;
  char* out = static_cast<char*>(malloc(static_cast<size_t>(n) + 1));
  if (!out) return nullptr;
  if (WideCharToMultiByte(CP_UTF8, 0, in, static_cast<int>(in_len), out, n, nullptr, nullptr) <= 0) {
    free(out);
    return nullptr;
  }
  out[n] = '\0';
  return out;
}

wchar_t* ReadFileUtf8(const wchar_t* path) {
  FILE* fp = _wfopen(path, L"rb");
  if (!fp) {
    fwprintf(stderr, L"Cannot open: %ls\n", path);
    exit(1);
  }
  size_t len = 0, cap = 256;
  char* buf = static_cast<char*>(malloc(cap));
  CHECK(buf);
  for (int c; (c = fgetc(fp)) != EOF;) {
    if (c == '\r') continue;
    if (len + 1 >= cap) {
      cap *= 2;
      buf = static_cast<char*>(realloc(buf, cap));
      CHECK(buf);
    }
    buf[len++] = static_cast<char>(c);
  }
  CHECK(!ferror(fp));
  fclose(fp);
  buf[len] = 0;
  wchar_t* out = Utf8ToWideDup(buf);
  CHECK(out);
  free(buf);
  return out;
}

bool PrintJsValue(FILE* out, const API& api, JsValueRef value, char terminator = 0) {
  JsValueRef s = nullptr;
  if (api.JsConvertValueToString(value, &s) != 0 || !s) return false;
  const wchar_t* w = nullptr;
  size_t len = 0;
  if (api.JsStringToPointer(s, &w, &len) != 0 || !w) return false;
  char* utf8 = WideToUtf8Dup(w, len);
  if (!utf8) return false;
  fprintf(out, "%s", utf8);
  if (terminator) fputc(terminator, out);
  free(utf8);
  return true;
}

JsValueRef PrintJsValues(JsValueRef* argv, unsigned short argc, void* state, char terminator = 0) {
  const API* api = reinterpret_cast<const API*>(state);
  CHECK(api);
  for (unsigned short i = 1; i < argc; i++) {
    if (i > 1) printf(" ");
    PrintJsValue(stdout, *api, argv[i]);
  }
  if (terminator) fputc(terminator, stdout);
  fflush(stdout);
  return api->undefined();
}

JsValueRef CALLBACK PrintCallback(JsValueRef, bool, JsValueRef* argv, unsigned short argc, void* state) {
  return PrintJsValues(argv, argc, state, '\n');
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
  while ((c = fgetwc(stdin)) != WEOF && c != L'\n') {
    if (c == L'\x04') { c = WEOF; break; }  // ^D / Unix-style EOF
    if (c == L'\r') continue;
    if (len + 1 >= cap) {
      cap *= 2;
      buf = static_cast<wchar_t*>(realloc(buf, cap * sizeof(*buf)));
      CHECK(buf);
    }
    buf[len++] = static_cast<wchar_t>(c);
  }
  if (!len && (c == WEOF || feof(stdin))) { free(buf); return api->undefined(); }
  buf[len] = 0;
  JsValueRef res = api->undefined();
  JsErrorCode err = api->JsPointerToString(buf, len, &res);
  free(buf);
  return err == JsNoError ? res : api->undefined();
}

void SetProp(const API& api, JsValueRef obj, const wchar_t* name, JsValueRef value) {
  JsPropertyIdRef id = nullptr;
  CHECK(api.JsGetPropertyIdFromName(name, &id) == JsNoError && id);
  CHECK(api.JsSetProperty(obj, id, value, true) == JsNoError);
}

void InitRuntime(const API& api, bool jitless) {
  JsRuntimeHandle runtime = nullptr;
  JsContextRef context = nullptr;
  JsRuntimeAttributes attrs = jitless ? JsRuntimeAttributeDisableNativeCodeGeneration : JsRuntimeAttributeNone;
  JsErrorCode err = api.edge
      ? api.JsCreateRuntime_edge(attrs, nullptr, &runtime)
      : api.JsCreateRuntime_legacy(attrs, JsRuntimeVersionEdge, nullptr, &runtime);
  if (err != JsNoError || !runtime) {
    fatal("JsCreateRuntime failed (0x%08x)", err);
  }

  err = api.edge
      ? api.JsCreateContext_edge(runtime, &context)
      : api.JsCreateContext_legacy(runtime, nullptr, &context);
  if (err != JsNoError || !context) {
    fatal("JsCreateContext failed (0x%08x)", err);
  }

  CHECK(api.JsSetCurrentContext(context) == JsNoError);
}

// Add WScript-like I/O methods for REPL
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
      fprintf(stderr, "Compile error\n");
    } else if (err == JsErrorScriptException && api.JsGetAndClearException(&ex) == 0 && ex) {
      fprintf(stderr, "Uncaught ");
      if (!PrintJsValue(stderr, api, ex, '\n')) {
        fprintf(stderr, "exception\n");
      }
    } else {
      fprintf(stderr, "JsRunScript failed (0x%08x)\n", err);
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
  print(ScriptEngineMajorVersion() + "." + ScriptEngineMinorVersion() + "." + ScriptEngineBuildVersion());
)";

static const wchar_t kReplCode[] = LR"(
  (function() {
    while (true) {
      WScript.StdOut.Write("> ");

      var __line = WScript.StdIn.ReadLine();
      if (__line === undefined || __line === null) break;
      __line = __line.replace(/^\s+|\s+$/g, "");
      if (__line === "exit" || __line === "quit" || __line == "\x04" /*^D*/) break;
      if (__line === "") continue;

      try {
        var __res = eval(__line);
        if (typeof __res !== "undefined") {
          print(typeof __res === "object" ? JSON.stringify(__res) : __res);
        }
      } catch (__err) {
        var __name = __err && __err.name;
        var __msg = __err && __err.message;
        print("Uncaught " + (__name ? __name + ": " : "") + (__msg || __err));
      }
    }
  })();
)";

}  // namespace

int wmain(int argc, wchar_t** argv) {
  const wchar_t* dll_path = L"jscript9.dll";
  int first_script_arg = -1;
  bool show_version = false;
  bool jitless = false;

  for (int i = 1; i < argc; i++) {
    if (lstrcmpiW(argv[i], L"--help") == 0 || lstrcmpiW(argv[i], L"-h") == 0) {
      printf("Usage: jsrt.exe [--dll jscript9.dll] [--jitless] [--version] [script.js ...]\n");
      return 0;
    } else if (lstrcmpiW(argv[i], L"--dll") == 0 && i + 1 < argc) {
      dll_path = argv[++i];
    } else if (lstrcmpiW(argv[i], L"--version") == 0) {
      show_version = true;
    } else if (lstrcmpiW(argv[i], L"--jitless") == 0 || lstrcmpiW(argv[i], L"--no-jit") == 0) {
      jitless = true;
    } else {
      first_script_arg = i;
      break;
    }
  }

  API api(dll_path);
  InitRuntime(api, jitless);
  InitGlobals(api);
  CHECK(RunScript(api, kInitCode));

  bool ok = true;
  if (show_version) {
    ok = RunScript(api, kVersionCode);
  } else if (first_script_arg != -1) {
    for (int i = first_script_arg; i < argc && ok; i++) {
      wchar_t* code = ReadFileUtf8(argv[i]);
      ok &= RunScript(api, code);
      free(code);
    }
  } else {
    ok = RunScript(api, kReplCode);
  }

  exit(ok ? 0 : 1);
}
