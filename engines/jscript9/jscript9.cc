// Minimal standalone host executable for Microsoft JScript9 (IE JsRT API).
//
// Usage:
//   jscript9.exe [--dll jscript9.dll] [--version] [script.js]
//
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

#include <windows.h>

#include <cstdio>
#include <cstdlib>
#include <fstream>
#include <iostream>
#include <string>

namespace {

typedef int JsErrorCode;
typedef void* JsRuntimeHandle;
typedef void* JsContextRef;
typedef void* JsValueRef;
typedef void* JsPropertyIdRef;
typedef unsigned int JsRuntimeAttributes;
typedef long JsRuntimeVersion;
typedef unsigned __int64 JsSourceContext;

enum JsValueType {
  JsUndefined = 0,
  JsNull = 1,
  JsNumber = 2,
  JsString = 3,
  JsBoolean = 4,
  JsObject = 5,
  JsFunction = 6,
  JsError = 7,
  JsArray = 8,
  JsSymbol = 9,
  JsArrayBuffer = 10,
  JsTypedArray = 11,
  JsDataView = 12,
};

typedef JsValueRef(CALLBACK* JsNativeFunction)(
    JsValueRef callee,
    bool isConstructCall,
    JsValueRef* arguments,
    unsigned short argumentCount,
    void* callbackState);

struct JsApi {
  HMODULE dll = nullptr;

  JsErrorCode(STDAPICALLTYPE* CreateRuntime)(JsRuntimeAttributes, JsRuntimeVersion, void*, JsRuntimeHandle*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* CreateContext)(JsRuntimeHandle, void*, JsContextRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* SetCurrentContext)(JsContextRef) = nullptr;
  JsErrorCode(STDAPICALLTYPE* DisposeRuntime)(JsRuntimeHandle) = nullptr;
  JsErrorCode(STDAPICALLTYPE* RunScript)(const wchar_t*, JsSourceContext, const wchar_t*, JsValueRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* ConvertValueToString)(JsValueRef, JsValueRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* StringToPointer)(JsValueRef, const wchar_t**, size_t*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* GetUndefinedValue)(JsValueRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* CreateFunction)(JsNativeFunction, void*, JsValueRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* GetGlobalObject)(JsValueRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* CreateObject)(JsValueRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* GetPropertyIdFromName)(const wchar_t*, JsPropertyIdRef*) = nullptr;
  JsErrorCode(STDAPICALLTYPE* SetProperty)(JsValueRef, JsPropertyIdRef, JsValueRef, bool) = nullptr;
  JsErrorCode(STDAPICALLTYPE* GetValueType)(JsValueRef, JsValueType*) = nullptr;
};

JsApi g_api;

std::wstring Utf8ToWide(const std::string& in) {
  if (in.empty()) return L"";
  int n = MultiByteToWideChar(CP_UTF8, 0, in.data(), static_cast<int>(in.size()), nullptr, 0);
  if (n <= 0) return L"";
  std::wstring out(static_cast<size_t>(n), L'\0');
  MultiByteToWideChar(CP_UTF8, 0, in.data(), static_cast<int>(in.size()), out.data(), n);
  return out;
}

std::string WideToUtf8(const std::wstring& in) {
  if (in.empty()) return "";
  int n = WideCharToMultiByte(CP_UTF8, 0, in.data(), static_cast<int>(in.size()), nullptr, 0, nullptr, nullptr);
  if (n <= 0) return "";
  std::string out(static_cast<size_t>(n), '\0');
  WideCharToMultiByte(CP_UTF8, 0, in.data(), static_cast<int>(in.size()), out.data(), n, nullptr, nullptr);
  return out;
}

std::wstring ReadFileWide(const wchar_t* path) {
  int n = WideCharToMultiByte(CP_UTF8, 0, path, -1, nullptr, 0, nullptr, nullptr);
  if (n <= 0) return L"";
  std::string path8(static_cast<size_t>(n), '\0');
  WideCharToMultiByte(CP_UTF8, 0, path, -1, &path8[0], n, nullptr, nullptr);

  std::ifstream file(path8.c_str(), std::ios::binary);
  if (!file) return L"";
  std::string data((std::istreambuf_iterator<char>(file)), std::istreambuf_iterator<char>());
  return Utf8ToWide(data);
}

const char* JsErrorName(JsErrorCode e) {
  switch (e) {
    case 0: return "JsNoError";
    case 0x10001: return "JsErrorInvalidArgument";
    case 0x10002: return "JsErrorNullArgument";
    case 0x10003: return "JsErrorNoCurrentContext";
    case 0x10004: return "JsErrorInExceptionState";
    case 0x10005: return "JsErrorNotImplemented";
    case 0x10006: return "JsErrorWrongThread";
    case 0x10007: return "JsErrorRuntimeInUse";
    case 0x10008: return "JsErrorBadSerializedScript";
    case 0x10009: return "JsErrorInDisabledState";
    case 0x1000a: return "JsErrorCannotDisableExecution";
    case 0x1000b: return "JsErrorHeapEnumInProgress";
    case 0x1000c: return "JsErrorArgumentNotObject";
    case 0x1000d: return "JsErrorInProfileCallback";
    case 0x1000e: return "JsErrorInThreadServiceCallback";
    case 0x1000f: return "JsErrorCannotSerializeDebugScript";
    case 0x20001: return "JsErrorScriptException";
    case 0x20002: return "JsErrorScriptCompile";
    case 0x20003: return "JsErrorScriptTerminated";
    case 0x30000: return "JsErrorFatal";
    default: return "JsError(unknown)";
  }
}

std::wstring NormalizeDllPathForWine(const wchar_t* path) {
  if (!path || !*path) return L"";
  std::wstring p(path);
  if (!p.empty() && p[0] == L'/') {
    p = L"Z:" + p;
  }
  for (size_t i = 0; i < p.size(); ++i) {
    if (p[i] == L'/') p[i] = L'\\';
  }
  return p;
}

bool LoadApi(const wchar_t* dll_path) {
  if (dll_path && *dll_path) {
    std::wstring normalized = NormalizeDllPathForWine(dll_path);
    g_api.dll = LoadLibraryW(normalized.c_str());
  } else {
    g_api.dll = LoadLibraryW(L"jscript9.dll");
  }
  if (!g_api.dll) return false;

#define LOAD_SYM(name) g_api.name = reinterpret_cast<decltype(g_api.name)>(GetProcAddress(g_api.dll, "Js" #name))
  LOAD_SYM(CreateRuntime);
  LOAD_SYM(CreateContext);
  LOAD_SYM(SetCurrentContext);
  LOAD_SYM(DisposeRuntime);
  LOAD_SYM(RunScript);
  LOAD_SYM(ConvertValueToString);
  LOAD_SYM(StringToPointer);
  LOAD_SYM(GetUndefinedValue);
  LOAD_SYM(CreateFunction);
  LOAD_SYM(GetGlobalObject);
  LOAD_SYM(CreateObject);
  LOAD_SYM(GetPropertyIdFromName);
  LOAD_SYM(SetProperty);
  LOAD_SYM(GetValueType);
#undef LOAD_SYM

  return g_api.CreateRuntime && g_api.CreateContext && g_api.SetCurrentContext && g_api.DisposeRuntime && g_api.RunScript &&
         g_api.ConvertValueToString && g_api.StringToPointer && g_api.GetUndefinedValue && g_api.CreateFunction &&
         g_api.GetGlobalObject && g_api.CreateObject && g_api.GetPropertyIdFromName && g_api.SetProperty && g_api.GetValueType;
}

void PrintJsValue(JsValueRef value) {
  JsValueRef s = nullptr;
  if (g_api.ConvertValueToString(value, &s) != 0 || !s) return;
  const wchar_t* w = nullptr;
  size_t len = 0;
  if (g_api.StringToPointer(s, &w, &len) != 0 || !w) return;
  std::wstring ws(w, len);
  std::string utf8 = WideToUtf8(ws);
  std::printf("%s\n", utf8.c_str());
}

JsValueRef CALLBACK PrintCallback(
    JsValueRef,
    bool,
    JsValueRef* args,
    unsigned short count,
    void*) {
  for (unsigned short i = 1; i < count; ++i) {
    if (i > 1) std::printf(" ");
    JsValueRef s = nullptr;
    if (g_api.ConvertValueToString(args[i], &s) != 0 || !s) continue;
    const wchar_t* w = nullptr;
    size_t len = 0;
    if (g_api.StringToPointer(s, &w, &len) != 0 || !w) continue;
    std::wstring ws(w, len);
    std::string utf8 = WideToUtf8(ws);
    std::printf("%s", utf8.c_str());
  }
  std::printf("\n");
  std::fflush(stdout);

  JsValueRef undef = nullptr;
  g_api.GetUndefinedValue(&undef);
  return undef;
}

bool SetProp(JsValueRef obj, const wchar_t* name, JsValueRef value) {
  JsPropertyIdRef id = nullptr;
  if (g_api.GetPropertyIdFromName(name, &id) != 0 || !id) return false;
  return g_api.SetProperty(obj, id, value, true) == 0;
}

bool InstallGlobals() {
  JsValueRef global = nullptr;
  if (g_api.GetGlobalObject(&global) != 0 || !global) return false;

  JsValueRef print_fn = nullptr;
  if (g_api.CreateFunction(&PrintCallback, nullptr, &print_fn) != 0 || !print_fn) return false;
  if (!SetProp(global, L"print", print_fn)) return false;

  JsValueRef console_obj = nullptr;
  if (g_api.CreateObject(&console_obj) != 0 || !console_obj) return false;
  if (!SetProp(console_obj, L"log", print_fn)) return false;
  if (!SetProp(global, L"console", console_obj)) return false;
  return true;
}

JsErrorCode RunCode(const std::wstring& code, JsValueRef* out) {
  static JsSourceContext src = 1;
  return g_api.RunScript(code.c_str(), src++, L"stdin", out);
}

bool CreateRuntime(JsRuntimeHandle* runtime_out) {
  if (!runtime_out) return false;
  *runtime_out = nullptr;

  const JsRuntimeVersion versions[] = {-1, 1, 0};  // Edge, IE11, IE10
  for (size_t i = 0; i < sizeof(versions) / sizeof(versions[0]); ++i) {
    JsRuntimeHandle runtime = nullptr;
    JsErrorCode err = g_api.CreateRuntime(0, versions[i], nullptr, &runtime);
    if (err == 0 && runtime) {
      *runtime_out = runtime;
      return true;
    }
  }
  return false;
}

void PrintUsage() {
  std::puts("Usage: jscript9.exe [--dll path/to/jscript9.dll] [--version] [script.js]");
}

}  // namespace

int wmain(int argc, wchar_t** argv) {
  const wchar_t* dll_path = nullptr;
  const wchar_t* script_path = nullptr;
  bool show_version = false;

  for (int i = 1; i < argc; ++i) {
    if (lstrcmpiW(argv[i], L"--help") == 0 || lstrcmpiW(argv[i], L"-h") == 0) {
      PrintUsage();
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
    script_path = argv[i];
    break;
  }

  HRESULT cohr = CoInitializeEx(nullptr, COINIT_APARTMENTTHREADED);
  if (FAILED(cohr)) {
    std::fprintf(stderr, "CoInitializeEx failed\n");
    return 1;
  }

  JsRuntimeHandle runtime = nullptr;
  JsContextRef context = nullptr;
  int rc = 1;

  if (!LoadApi(dll_path)) {
    std::fprintf(stderr, "Failed to load JSRT exports from jscript9 DLL\n");
    goto cleanup;
  }

  if (!CreateRuntime(&runtime)) {
    std::fprintf(stderr, "JsCreateRuntime failed\n");
    goto cleanup;
  }

  {
    JsErrorCode err = g_api.CreateContext(runtime, nullptr, &context);
    if (err != 0 || !context) {
      std::fprintf(stderr, "JsCreateContext failed: 0x%08x (%s)\n", err, JsErrorName(err));
      goto cleanup;
    }
  }

  {
    JsErrorCode err = g_api.SetCurrentContext(context);
    if (err != 0) {
      std::fprintf(stderr, "JsSetCurrentContext failed: 0x%08x (%s)\n", err, JsErrorName(err));
      goto cleanup;
    }
  }

  if (!InstallGlobals()) {
    std::fprintf(stderr, "InstallGlobals failed\n");
    goto cleanup;
  }

  if (show_version) {
    JsValueRef out = nullptr;
    JsErrorCode err = RunCode(
        L"ScriptEngine()+\" \"+ScriptEngineMajorVersion()+\".\"+ScriptEngineMinorVersion()+\".\"+ScriptEngineBuildVersion()",
        &out);
    if (err != 0) {
      std::fprintf(stderr, "Version probe failed: 0x%08x (%s)\n", err, JsErrorName(err));
      goto cleanup;
    }
    PrintJsValue(out);
    rc = 0;
    goto cleanup;
  }

  if (script_path) {
    std::wstring code = ReadFileWide(script_path);
    if (code.empty()) {
      std::fprintf(stderr, "Failed to read script\n");
      goto cleanup;
    }

    JsValueRef out = nullptr;
    JsErrorCode err = RunCode(code, &out);
    if (err != 0) {
      std::fprintf(stderr, "Script execution failed: 0x%08x (%s)\n", err, JsErrorName(err));
      goto cleanup;
    }

    rc = 0;
    goto cleanup;
  }

  {
    JsValueRef out = nullptr;
    if (RunCode(
            L"ScriptEngine()+\" \"+ScriptEngineMajorVersion()+\".\"+ScriptEngineMinorVersion()+\".\"+ScriptEngineBuildVersion()",
            &out) == 0) {
      PrintJsValue(out);
    }
  }

  for (;;) {
    std::printf("> ");
    std::fflush(stdout);
    std::string line;
    if (!std::getline(std::cin, line)) break;
    if (line == "exit" || line == "quit") break;
    if (line.empty()) continue;

    std::wstring code = Utf8ToWide(line);
    JsValueRef out = nullptr;
    JsErrorCode err = RunCode(code, &out);
    if (err != 0) {
      std::fprintf(stderr, "Script execution failed: 0x%08x (%s)\n", err, JsErrorName(err));
      continue;
    }
    if (!out) continue;

    JsValueType vt = JsUndefined;
    if (g_api.GetValueType(out, &vt) == 0 && vt != JsUndefined) {
      PrintJsValue(out);
    }
  }

  rc = 0;

cleanup:
  if (g_api.SetCurrentContext) g_api.SetCurrentContext(nullptr);
  if (runtime && g_api.DisposeRuntime) g_api.DisposeRuntime(runtime);
  CoUninitialize();
  return rc;
}
