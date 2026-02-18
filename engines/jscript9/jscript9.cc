// Minimal standalone host executable for Microsoft JScript9 (JsRT API).
//
// Usage:
//   jscript9.exe [--dll jscript9.dll] [--jitless] [--version] [script.js]
//
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

#include <windows.h>

#include <cstdarg>
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

enum JsValueType { JsUndefined = 0 };

typedef int JsErrorCode;
typedef void* JsRuntimeHandle;
typedef void* JsContextRef;
typedef void* JsValueRef;
typedef void* JsPropertyIdRef;
typedef unsigned int JsRuntimeAttributes;
typedef long JsRuntimeVersion;
typedef unsigned __int64 JsSourceContext;

typedef JsValueRef(CALLBACK* JsNativeFunction)(JsValueRef callee, bool isConstructCall, JsValueRef* args, unsigned short argc, void* state);

static const JsRuntimeAttributes JsRuntimeAttributeDisableNativeCodeGeneration = 0x00000008u;
static const JsErrorCode JsErrorScriptException = 0x00030001;
static const JsErrorCode JsErrorScriptCompile = 0x00030002;

struct API {
  JsErrorCode(STDAPICALLTYPE* JsCreateRuntime)(JsRuntimeAttributes, JsRuntimeVersion, void*, JsRuntimeHandle*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsCreateContext)(JsRuntimeHandle, void*, JsContextRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsSetCurrentContext)(JsContextRef) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsDisposeRuntime)(JsRuntimeHandle) = nullptr;
  JsErrorCode(STDAPICALLTYPE* JsRunScript)(const wchar_t*, JsSourceContext, const wchar_t*, JsValueRef*) = nullptr;
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
    dll_ = LoadLibraryW(dll_path);
    if (!dll_) fatal("LoadLibraryW failed");
    LoadProc(JsCreateRuntime, "JsCreateRuntime");
    LoadProc(JsCreateContext, "JsCreateContext");
    LoadProc(JsSetCurrentContext, "JsSetCurrentContext");
    LoadProc(JsDisposeRuntime, "JsDisposeRuntime");
    LoadProc(JsRunScript, "JsRunScript");
    LoadProc(JsConvertValueToString, "JsConvertValueToString");
    LoadProc(JsStringToPointer, "JsStringToPointer");
    LoadProc(JsGetUndefinedValue, "JsGetUndefinedValue");
    LoadProc(JsCreateFunction, "JsCreateFunction");
    LoadProc(JsGetGlobalObject, "JsGetGlobalObject");
    LoadProc(JsCreateObject, "JsCreateObject");
    LoadProc(JsGetPropertyIdFromName, "JsGetPropertyIdFromName");
    LoadProc(JsSetProperty, "JsSetProperty");
    LoadProc(JsGetValueType, "JsGetValueType");
    LoadProc(JsGetAndClearException, "JsGetAndClearException");
  }

 private:
  template <typename T> void LoadProc(T& fn, const char* symbol) {
    fn = reinterpret_cast<T>(GetProcAddress(dll_, symbol));
    if (!fn) fatal("GetProcAddress failed: %s", symbol);
  }

  HMODULE dll_ = nullptr;
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

JsValueRef CALLBACK PrintCallback(JsValueRef, bool, JsValueRef* args, unsigned short argc, void* state) {
  const API* api = reinterpret_cast<const API*>(state);
  if (!api) return nullptr;

  for (unsigned short i = 1; i < argc; ++i) {
    if (i > 1) printf(" ");
    PrintJsValue(stdout, *api, args[i]);
  }
  fputc('\n', stdout);
  fflush(stdout);

  JsValueRef undef = nullptr;
  api->JsGetUndefinedValue(&undef);
  return undef;
}

bool SetProp(const API& api, JsValueRef obj, const wchar_t* name, JsValueRef value) {
  JsPropertyIdRef id = nullptr;
  if (api.JsGetPropertyIdFromName(name, &id) != 0 || !id) return false;
  return api.JsSetProperty(obj, id, value, true) == 0;
}

bool InstallGlobals(const API& api) {
  JsValueRef global = nullptr;
  if (api.JsGetGlobalObject(&global) != 0 || !global) return false;

  JsValueRef print_fn = nullptr;
  if (api.JsCreateFunction(&PrintCallback, const_cast<API*>(&api), &print_fn) != 0 || !print_fn) return false;
  if (!SetProp(api, global, L"print", print_fn)) return false;

  JsValueRef console_obj = nullptr;
  if (api.JsCreateObject(&console_obj) != 0 || !console_obj) return false;
  if (!SetProp(api, console_obj, L"log", print_fn)) return false;
  if (!SetProp(api, global, L"console", console_obj)) return false;
  return true;
}

void InitRuntime(const API& api, bool jitless) {
  JsRuntimeHandle runtime = nullptr;
  JsContextRef context = nullptr;
  JsRuntimeAttributes attrs = jitless ? JsRuntimeAttributeDisableNativeCodeGeneration : 0;
  const JsRuntimeVersion versions[] = {-1, 1, 0};
  for (size_t i = 0; i < sizeof(versions) / sizeof(versions[0]); ++i) {
    runtime = nullptr;
    JsErrorCode err = api.JsCreateRuntime(attrs, versions[i], nullptr, &runtime);
    if (err == 0 && runtime) {
      break;
    }
  }
  if (!runtime) fatal("JsCreateRuntime failed");

  JsErrorCode err = api.JsCreateContext(runtime, nullptr, &context);
  if (err != 0 || !context) fatal("JsCreateContext failed (0x%08x)", err);

  err = api.JsSetCurrentContext(context);
  if (err != 0) fatal("JsSetCurrentContext failed (0x%08x)", err);

  if (!InstallGlobals(api)) fatal("InstallGlobals failed");
}

bool Eval(const API& api, const char* code_utf8, JsValueRef* out) {
  if (!out) return false;
  *out = nullptr;
  wchar_t* code = Utf8ToWideDup(code_utf8);
  if (!code) {
    fprintf(stderr, "Eval err (encoding)\n");
    return false;
  }
  JsErrorCode err = api.JsRunScript(code, 0, L"stdin", out);
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

}  // namespace

int wmain(int argc, wchar_t** argv) {
  const wchar_t* dll_path = L"jscript9.dll";
  const wchar_t* script_path = nullptr;
  bool show_version = false;
  bool jitless = false;

  for (int i = 1; i < argc; ++i) {
    if (lstrcmpiW(argv[i], L"--help") == 0 || lstrcmpiW(argv[i], L"-h") == 0) {
      printf("Usage: jscript9.exe [--dll jscript9.dll] [--jitless] [--version] [script.js]\n");
      return 0;
    }
    if (lstrcmpiW(argv[i], L"--dll") == 0 && i + 1 < argc) {
      dll_path = argv[++i];
      continue;
    }
    if (lstrcmpiW(argv[i], L"--version") == 0) {
      show_version = true;
      continue;
    }
    if (lstrcmpiW(argv[i], L"--jitless") == 0 || lstrcmpiW(argv[i], L"--no-jit") == 0) {
      jitless = true;
      continue;
    }
    script_path = argv[i];
    break;
  }

  API api(dll_path);
  InitRuntime(api, jitless);

  if (show_version) {
    JsValueRef out = nullptr;
    bool ok = Eval(api, "ScriptEngineMajorVersion()+'.'+ScriptEngineMinorVersion()+'.'+ScriptEngineBuildVersion()", &out);
    if (!ok) exit(1);
    PrintJsValue(stdout, api, out, '\n');
  } else if (script_path) {
    char* code = ReadFileUtf8(script_path);
    if (!code || !*code) fatal("Failed to read script");
    JsValueRef out = nullptr;
    if (!Eval(api, code, &out)) exit(1);
    free(code);
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
