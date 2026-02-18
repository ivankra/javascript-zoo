// Minimal standalone host executable for Microsoft JScript9 (IE JsRT API).
//
// Usage:
//   jscript9.exe [--dll jscript9.dll] [--jitless] [--version] [script.js]
//
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

#include <windows.h>

#include <cstdarg>
#include <cstdio>
#include <cstdlib>
#include <fstream>
#include <iostream>
#include <string>

namespace {

[[noreturn]] void fatal(const char* fmt, ...) {
  va_list ap;
  va_start(ap, fmt);
  vfprintf(stderr, fmt, ap);
  va_end(ap);
  fputc('\n', stderr);
  exit(1);
}

typedef int JsErrorCode;
typedef void* JsRuntimeHandle;
typedef void* JsContextRef;
typedef void* JsValueRef;
typedef void* JsPropertyIdRef;
typedef unsigned int JsRuntimeAttributes;
typedef long JsRuntimeVersion;
typedef unsigned __int64 JsSourceContext;

static const JsRuntimeAttributes JsRuntimeAttributeDisableNativeCodeGeneration = 0x00000008u;

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

typedef JsValueRef(CALLBACK* JsNativeFunction)(JsValueRef callee, bool isConstructCall, JsValueRef* arguments, unsigned short argumentCount, void* callbackState);

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
  }

 private:
  template <typename T> void LoadProc(T& fn, const char* symbol) {
    fn = reinterpret_cast<T>(GetProcAddress(dll_, symbol));
    if (!fn) fatal("GetProcAddress failed: %s", symbol);
  }

  HMODULE dll_ = nullptr;
};

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
    default: return "unknown";
  }
}

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


bool CreateRuntime(const API& api, JsRuntimeAttributes attrs, JsRuntimeHandle* runtime_out) {
  if (!runtime_out) return false;
  *runtime_out = nullptr;
  const JsRuntimeVersion versions[] = {-1, 1, 0};
  for (size_t i = 0; i < sizeof(versions) / sizeof(versions[0]); ++i) {
    JsRuntimeHandle runtime = nullptr;
    JsErrorCode err = api.JsCreateRuntime(attrs, versions[i], nullptr, &runtime);
    if (err == 0 && runtime) {
      *runtime_out = runtime;
      return true;
    }
  }
  return false;
}

JsValueRef Eval(const API& api, const std::wstring& code) {
  JsValueRef out = nullptr;
  JsErrorCode err = api.JsRunScript(code.c_str(), 0, L"stdin", &out);
  if (err != 0) {
    fatal("Script execution failed: 0x%08x (%s)", err, JsErrorName(err));
  }
  return out;
}

void PrintJsValue(const API& api, JsValueRef value) {
  JsValueRef s = nullptr;
  if (api.JsConvertValueToString(value, &s) != 0 || !s) return;
  const wchar_t* w = nullptr;
  size_t len = 0;
  if (api.JsStringToPointer(s, &w, &len) != 0 || !w) return;
  std::wstring ws(w, len);
  std::string utf8 = WideToUtf8(ws);
  printf("%s\n", utf8.c_str());
}

bool SetProp(const API& api, JsValueRef obj, const wchar_t* name, JsValueRef value) {
  JsPropertyIdRef id = nullptr;
  if (api.JsGetPropertyIdFromName(name, &id) != 0 || !id) return false;
  return api.JsSetProperty(obj, id, value, true) == 0;
}

JsValueRef CALLBACK PrintCallback(JsValueRef, bool, JsValueRef* args, unsigned short count, void* callback_state) {
  const API* api = reinterpret_cast<const API*>(callback_state);
  if (!api) return nullptr;

  for (unsigned short i = 1; i < count; ++i) {
    if (i > 1) printf(" ");
    JsValueRef s = nullptr;
    if (api->JsConvertValueToString(args[i], &s) != 0 || !s) continue;
    const wchar_t* w = nullptr;
    size_t len = 0;
    if (api->JsStringToPointer(s, &w, &len) != 0 || !w) continue;
    std::wstring ws(w, len);
    std::string utf8 = WideToUtf8(ws);
    printf("%s", utf8.c_str());
  }
  printf("\n");
  fflush(stdout);

  JsValueRef undef = nullptr;
  api->JsGetUndefinedValue(&undef);
  return undef;
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

}  // namespace

int wmain(int argc, wchar_t** argv) {
  const wchar_t* dll_path = L"jscript9.dll";
  const wchar_t* script_path = nullptr;
  bool show_version = false;
  bool jitless = false;

  for (int i = 1; i < argc; ++i) {
    if (lstrcmpiW(argv[i], L"--help") == 0 || lstrcmpiW(argv[i], L"-h") == 0) {
      printf("Usage: jscript9.exe [--dll path/to/jscript9.dll] [--jitless] [--version] [script.js]\n");
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

  HRESULT cohr = CoInitializeEx(nullptr, COINIT_APARTMENTTHREADED);
  if (FAILED(cohr)) fatal("CoInitializeEx failed");

  API api(dll_path);
  JsRuntimeHandle runtime = nullptr;
  JsContextRef context = nullptr;

  JsRuntimeAttributes attrs = jitless ? JsRuntimeAttributeDisableNativeCodeGeneration : 0;
  if (!CreateRuntime(api, attrs, &runtime)) fatal("JsCreateRuntime failed");

  JsErrorCode err = api.JsCreateContext(runtime, nullptr, &context);
  if (err != 0 || !context) fatal("JsCreateContext failed: 0x%08x (%s)", err, JsErrorName(err));

  err = api.JsSetCurrentContext(context);
  if (err != 0) fatal("JsSetCurrentContext failed: 0x%08x (%s)", err, JsErrorName(err));

  if (!InstallGlobals(api)) fatal("InstallGlobals failed");

  if (show_version) {
    JsValueRef out = Eval(api, L"ScriptEngineMajorVersion()+'.'+ScriptEngineMinorVersion()+'.'+ScriptEngineBuildVersion()");
    PrintJsValue(api, out);
  } else if (script_path) {
    std::wstring code = ReadFileWide(script_path);
    if (code.empty()) fatal("Failed to read script");
    Eval(api, code);
  } else {
    // REPL
    for (;;) {
      printf("> ");
      fflush(stdout);
      std::string line;
      if (!std::getline(std::cin, line)) break;
      if (line == "exit" || line == "quit") break;
      if (line.empty()) continue;

      std::wstring code = Utf8ToWide(line);
      JsValueRef out = Eval(api, code);
      if (!out) continue;

      JsValueType vt = JsUndefined;
      api.JsGetValueType(out, &vt);
      if (vt != JsUndefined) PrintJsValue(api, out);
    }
  }

  exit(0);
}
