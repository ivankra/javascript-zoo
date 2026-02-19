// Standalone host executable for JSRT API engines (JScript9/Chakra/ChakraCore).
// Implements basic REPL and script runner.
//
// Legacy (jscript9.dll in IE9-11) and Edge (chakra.dll/ChakraCore.dll) JSRT API
// flavors are both supported and autodetected.
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
  JsValueRef undefined = nullptr;

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
  JsErrorCode(STDAPICALLTYPE* JsGetValueType)(JsValueRef, JsValueType*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsGetAndClearException)(JsValueRef*) = nullptr;

  explicit API(const wchar_t* dll_path) {
    dll = LoadLibraryW(dll_path);
    if (!dll) fatal("LoadLibraryW failed");
    edge = endswith_iW(dll_path, L"chakra.dll") || endswith_iW(dll_path, L"chakracore.dll") ||
           (!endswith_iW(dll_path, L"jscript9.dll") && GetProcAddress(dll, "JsCreateNamedFunction") != nullptr);
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
    Resolve(JsGetValueType, "JsGetValueType");
    Resolve(JsGetAndClearException, "JsGetAndClearException");
    // Cache undefined value and quick sanity check
    if (JsGetUndefinedValue(&undefined) != JsNoError) fatal("JsGetUndefinedValue failed");
    JsValueType vt = JsNull;
    if (JsGetValueType(undefined, &vt) != JsNoError || vt != JsUndefined) fatal("JsGetValueType failed");
  }

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

char* ReadFileUtf8(const wchar_t* path) {
  int n = WideCharToMultiByte(CP_UTF8, 0, path, -1, nullptr, 0, nullptr, nullptr);
  if (n <= 0) return nullptr;
  char* path8 = static_cast<char*>(malloc(static_cast<size_t>(n)));
  if (!path8) return nullptr;
  WideCharToMultiByte(CP_UTF8, 0, path, -1, path8, n, nullptr, nullptr);

  FILE* file = fopen(path8, "rb");
  free(path8);
  if (!file) return nullptr;

  if (fseek(file, 0, SEEK_END) != 0) {
    fclose(file);
    return nullptr;
  }
  long size = ftell(file);
  if (size < 0) {
    fclose(file);
    return nullptr;
  }
  rewind(file);

  char* data = static_cast<char*>(malloc(static_cast<size_t>(size) + 1));
  if (!data) {
    fclose(file);
    return nullptr;
  }
  size_t got = 0;
  if (size > 0) got = fread(data, 1, static_cast<size_t>(size), file);
  if (got != static_cast<size_t>(size)) {
    fclose(file);
    free(data);
    return nullptr;
  }
  data[size] = '\0';
  fclose(file);
  return data;
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

JsValueRef CALLBACK PrintCallback(JsValueRef, bool, JsValueRef* argv, unsigned short argc, void* state) {
  const API* api = reinterpret_cast<const API*>(state);
  if (!api) return nullptr;
  for (unsigned short i = 1; i < argc; ++i) {
    if (i > 1) printf(" ");
    PrintJsValue(stdout, *api, argv[i]);
  }
  printf("\n");
  fflush(stdout);
  return api->undefined;
}

JsValueRef CALLBACK WriteCallback(JsValueRef, bool, JsValueRef* argv, unsigned short argc, void* state) {
  const API* api = reinterpret_cast<const API*>(state);
  if (!api) return nullptr;
  for (unsigned short i = 1; i < argc; ++i) {
    if (i > 1) printf(" ");
    PrintJsValue(stdout, *api, argv[i]);
  }
  fflush(stdout);
  return api->undefined;
}

JsValueRef CALLBACK ReadLineCallback(JsValueRef, bool, JsValueRef*, unsigned short, void* state) {
  const API* api = reinterpret_cast<const API*>(state);
  if (!api) return nullptr;

  char line[8192];
  if (!fgets(line, sizeof(line), stdin)) return api->undefined;
  line[strcspn(line, "\r\n")] = '\0';

  wchar_t* w = Utf8ToWideDup(line);
  if (!w) return api->undefined;

  JsValueRef s = api->undefined;
  JsErrorCode err = api->JsPointerToString(w, wcslen(w), &s);
  free(w);
  return err == JsNoError ? s : api->undefined;
}

void SetProp(const API& api, JsValueRef obj, const wchar_t* name, JsValueRef value) {
  JsPropertyIdRef id = nullptr;
  JsErrorCode err = api.JsGetPropertyIdFromName(name, &id);
  if (err != JsNoError || !id) fatal("JsGetPropertyIdFromName failed (0x%08x)", err);
  err = api.JsSetProperty(obj, id, value, true);
  if (err != JsNoError) fatal("JsSetProperty failed (0x%08x)", err);
}

void InitRuntime(const API& api, bool jitless) {
  JsRuntimeHandle runtime = nullptr;
  JsContextRef context = nullptr;
  JsRuntimeAttributes attrs = jitless ? JsRuntimeAttributeDisableNativeCodeGeneration : JsRuntimeAttributeNone;
  JsErrorCode err = api.edge
      ? api.JsCreateRuntime_edge(attrs, nullptr, &runtime)
      : api.JsCreateRuntime_legacy(attrs, JsRuntimeVersionEdge, nullptr, &runtime);
  if (err != JsNoError) fatal("JsCreateRuntime failed (0x%08x)", err);
  if (!runtime) fatal("JsCreateRuntime failed");

  err = api.edge
      ? api.JsCreateContext_edge(runtime, &context)
      : api.JsCreateContext_legacy(runtime, nullptr, &context);
  if (err != JsNoError || !context) fatal("JsCreateContext failed (0x%08x)", err);

  err = api.JsSetCurrentContext(context);
  if (err != JsNoError) fatal("JsSetCurrentContext failed (0x%08x)", err);
}

// Add some WScript-compatible I/O methods useful for running REPL script
void InitGlobals(const API& api) {
  JsValueRef print_fn = nullptr;
  JsErrorCode err = api.JsCreateFunction(&PrintCallback, const_cast<API*>(&api), &print_fn);
  if (err != JsNoError || !print_fn) fatal("JsCreateFunction(print) failed (0x%08x)", err);

  JsValueRef readline_fn = nullptr;
  err = api.JsCreateFunction(&ReadLineCallback, const_cast<API*>(&api), &readline_fn);
  if (err != JsNoError || !readline_fn) fatal("JsCreateFunction(readline) failed (0x%08x)", err);

  JsValueRef write_fn = nullptr;
  err = api.JsCreateFunction(&WriteCallback, const_cast<API*>(&api), &write_fn);
  if (err != JsNoError || !write_fn) fatal("JsCreateFunction(write) failed (0x%08x)", err);

  JsValueRef global = nullptr;
  err = api.JsGetGlobalObject(&global);
  if (err != JsNoError || !global) fatal("JsGetGlobalObject failed (0x%08x)", err);
  SetProp(api, global, L"print", print_fn);
  SetProp(api, global, L"readline", readline_fn);

  JsValueRef console_obj = nullptr;
  err = api.JsCreateObject(&console_obj);
  if (err != JsNoError || !console_obj) fatal("JsCreateObject failed (0x%08x)", err);
  SetProp(api, console_obj, L"log", print_fn);
  SetProp(api, global, L"console", console_obj);

  JsValueRef stdin_obj = nullptr;
  err = api.JsCreateObject(&stdin_obj);
  if (err != JsNoError || !stdin_obj) fatal("JsCreateObject(StdIn) failed (0x%08x)", err);
  SetProp(api, stdin_obj, L"ReadLine", readline_fn);

  JsValueRef stdout_obj = nullptr;
  err = api.JsCreateObject(&stdout_obj);
  if (err != JsNoError || !stdout_obj) fatal("JsCreateObject(StdOut) failed (0x%08x)", err);
  SetProp(api, stdout_obj, L"Write", write_fn);

  JsValueRef wscript_obj = nullptr;
  err = api.JsCreateObject(&wscript_obj);
  if (err != JsNoError || !wscript_obj) fatal("JsCreateObject(WScript) failed (0x%08x)", err);
  SetProp(api, wscript_obj, L"StdOut", stdout_obj);
  SetProp(api, global, L"WScript", wscript_obj);
}

bool Eval(const API& api, const char* code_utf8, JsValueRef* out) {
  if (!out) return false;
  *out = nullptr;
  wchar_t* code = Utf8ToWideDup(code_utf8);
  if (!code) {
    fprintf(stderr, "Eval err (encoding)\n");
    return false;
  }
  JsErrorCode err = api.JsRunScript(code, JS_SOURCE_CONTEXT_NONE, L"stdin", out);
  free(code);
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

static const char kVersionCode[] = R"(
  print(ScriptEngineMajorVersion() + "." + ScriptEngineMinorVersion() + "." + ScriptEngineBuildVersion());
)";

}  // namespace

int wmain(int argc, wchar_t** argv) {
  const wchar_t* dll_path = L"jscript9.dll";
  int first_script_arg = -1;
  bool show_version = false;
  bool jitless = false;

  for (int i = 1; i < argc; ++i) {
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

  if (show_version) {
    JsValueRef out = nullptr;
    if (!Eval(api, kVersionCode, &out)) exit(1);
  } else if (first_script_arg != -1) {
    for (int i = first_script_arg; i < argc; ++i) {
      char* code = ReadFileUtf8(argv[i]);
      if (!code || !*code) fatal("Failed to read script file");
      JsValueRef out = nullptr;
      if (!Eval(api, code, &out)) exit(1);
      free(code);
    }
  } else {
    // REPL
    char line[8192];
    for (;;) {
      printf("> ");
      fflush(stdout);
      if (!fgets(line, sizeof(line), stdin)) break;
      line[strcspn(line, "\r\n")] = '\0';
      if (line[0] == '\0' || line[0] == '\x04') continue;  /* ^D */
      if (strcmp(line, "exit") == 0 || strcmp(line, "quit") == 0) break;

      JsValueRef out = nullptr;
      if (!Eval(api, line, &out) || !out) continue;

      JsValueType vt = JsUndefined;
      if (api.JsGetValueType(out, &vt) == 0 && vt != JsUndefined) {
        PrintJsValue(stdout, api, out, '\n');
      }
    }
  }

  exit(0);
}
