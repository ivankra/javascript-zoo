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

bool PrintJsValue(const API& api, JsValueRef value, FILE* out = stdout, bool newline = true) {
  JsValueRef s = nullptr;
  if (api.JsConvertValueToString(value, &s) != 0 || !s) return false;
  const wchar_t* w = nullptr;
  size_t len = 0;
  if (api.JsStringToPointer(s, &w, &len) != 0 || !w) return false;
  std::wstring ws(w, len);
  std::string utf8 = WideToUtf8(ws);
  fprintf(out, "%s", utf8.c_str());
  if (newline) fputc('\n', out);
  return true;
}

JsValueRef CALLBACK PrintCallback(JsValueRef, bool, JsValueRef* args, unsigned short argc, void* state) {
  const API* api = reinterpret_cast<const API*>(state);
  if (!api) return nullptr;

  for (unsigned short i = 1; i < argc; ++i) {
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

bool Eval(const API& api, const std::wstring& code, JsValueRef* out) {
  if (!out) return false;
  JsErrorCode err = api.JsRunScript(code.c_str(), 0, L"stdin", out);
  if (err == 0) return true;

  fprintf(stderr, "Eval failed (0x%08x)", err);
  JsValueRef ex = nullptr;
  if (api.JsGetAndClearException(&ex) == 0 && ex) {
    fprintf(stderr, ": ");
    if (!PrintJsValue(api, ex, stderr, false)) fprintf(stderr, "<exception>");
  }
  fprintf(stderr, "\n");
  return false;
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
  InitRuntime(api, jitless);

  if (show_version) {
    JsValueRef out = nullptr;
    if (!Eval(api, L"ScriptEngineMajorVersion()+'.'+ScriptEngineMinorVersion()+'.'+ScriptEngineBuildVersion()", &out)) {
      exit(1);
    }
    PrintJsValue(api, out);
  } else if (script_path) {
    std::wstring code = ReadFileWide(script_path);
    if (code.empty()) fatal("Failed to read script");
    JsValueRef out = nullptr;
    if (!Eval(api, code, &out)) {
      exit(1);
    }
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
      JsValueRef out = nullptr;
      if (!Eval(api, code, &out)) continue;
      if (!out) continue;

      JsValueType vt = JsUndefined;
      api.JsGetValueType(out, &vt);
      if (vt != JsUndefined) PrintJsValue(api, out);
    }
  }

  exit(0);
}
