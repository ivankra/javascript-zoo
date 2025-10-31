// Basic REPL/script runner for hako using wazero runtime.
// Needs a custom hako_wazero.wasm without -mtail-call and -Wl,--import-memory
// Tweaked LLM slop based on https://gist.github.com/andrewmd5/197efb527ef40131c34ca12fd6d0a61e

//go:build ignore
package main

import (
	"bufio"
	"context"
	"fmt"
	"os"
	"path/filepath"

	"github.com/tetratelabs/wazero"
	"github.com/tetratelabs/wazero/api"
	"github.com/tetratelabs/wazero/imports/wasi_snapshot_preview1"
)

var (
	instanceAPI api.Module
	mallocFunc  api.Function
	memoryAPI   api.Memory
	stdinReader = bufio.NewReader(os.Stdin)
)

func main() {
	ctx := context.Background()

	// Load the WebAssembly module
	exePath, err := os.Executable()
	check(err)
	wasmPath := filepath.Join(filepath.Dir(exePath), "hako_wazero.wasm")
	wasmBytes, err := os.ReadFile(wasmPath)
	check(err)

	// Create wazero runtime with all features enabled
	runtimeConfig := wazero.NewRuntimeConfig()
	r := wazero.NewRuntimeWithConfig(ctx, runtimeConfig)
	defer r.Close(ctx)

	// Instantiate WASI
	wasi_snapshot_preview1.MustInstantiate(ctx, r)

	// Compile the hako module
	compiledModule, err := r.CompileModule(ctx, wasmBytes)
	check(err)

	// Build host function module for hako callbacks
	_, err = r.NewHostModuleBuilder("hako").
		NewFunctionBuilder().WithFunc(callFunction).Export("call_function").
		NewFunctionBuilder().WithFunc(interruptHandler).Export("interrupt_handler").
		NewFunctionBuilder().WithFunc(loadModule).Export("load_module").
		NewFunctionBuilder().WithFunc(normalizeModule).Export("normalize_module").
		NewFunctionBuilder().WithFunc(resolveModule).Export("resolve_module").
		NewFunctionBuilder().WithFunc(profileFunctionStart).Export("profile_function_start").
		NewFunctionBuilder().WithFunc(profileFunctionEnd).Export("profile_function_end").
		NewFunctionBuilder().WithFunc(moduleInit).Export("module_init").
		NewFunctionBuilder().WithFunc(classConstructor).Export("class_constructor").
		NewFunctionBuilder().WithFunc(classFinalizer).Export("class_finalizer").
		Instantiate(ctx)
	check(err)

	// Instantiate the hako module with proper WASI configuration
	// Enable walltime and monotonic time for Date() to work correctly
	moduleConfig := wazero.NewModuleConfig().
		WithSysWalltime().
		WithSysNanotime()

	instance, err := r.InstantiateModule(ctx, compiledModule, moduleConfig)
	check(err)
	defer instance.Close(ctx)

	// Store instance and memory for callbacks
	instanceAPI = instance
	memoryAPI = instance.Memory()

	// Call WASI initialization if present
	initFunc := instance.ExportedFunction("_initialize")
	if initFunc != nil {
		_, err = initFunc.Call(ctx)
		check(err)
	}

	// Get required functions
	mallocFunc = instance.ExportedFunction("malloc")
	check(requireFunc(mallocFunc, "malloc"))
	freeFunc := instance.ExportedFunction("free")
	check(requireFunc(freeFunc, "free"))

	// Create Hako runtime and context
	newRuntimeFunc := instance.ExportedFunction("HAKO_NewRuntime")
	check(requireFunc(newRuntimeFunc, "HAKO_NewRuntime"))
	rtPtrResult, err := newRuntimeFunc.Call(ctx)
	check(err)
	runtimePtr := int32(rtPtrResult[0])

	newContextFunc := instance.ExportedFunction("HAKO_NewContext")
	check(requireFunc(newContextFunc, "HAKO_NewContext"))
	allIntrinsics := uint64(0xFFFF) // Enable all intrinsics
	ctxPtrResult, err := newContextFunc.Call(ctx, uint64(runtimePtr), allIntrinsics)
	check(err)
	contextPtr := int32(ctxPtrResult[0])

	// Setup global JavaScript functions
	setupPrintFunction(ctx, instance, contextPtr, mallocFunc, freeFunc)
	setupReadlineFunction(ctx, instance, contextPtr, mallocFunc, freeFunc)

	// Get evaluation functions
	evalFunc := instance.ExportedFunction("HAKO_Eval")
	check(requireFunc(evalFunc, "HAKO_Eval"))
	freeValueFunc := instance.ExportedFunction("HAKO_FreeValuePointer")
	check(requireFunc(freeValueFunc, "HAKO_FreeValuePointer"))

	jsCode := getReplCode()
	if len(os.Args) > 1 {
		scriptPath := os.Args[1]
		scriptBytes, err := os.ReadFile(scriptPath)
		check(err)
		jsCode = string(scriptBytes)
	}

	evaluateCode(ctx, evalFunc, freeValueFunc, mallocFunc, freeFunc, contextPtr, jsCode)

	cleanup(ctx, instance, contextPtr, runtimePtr)
}

func getReplCode() string {
	return `while (true) {
  try {
    const __line = readline();
    if (__line === null) break;
    const __result = eval(__line);
    if (__result !== undefined) {
      print(__result);
    }
  } catch (__err) {
    print("Error: " + __err);
  }
}`
}

// evaluateCode executes JavaScript code in the Hako runtime
func evaluateCode(ctx context.Context, evalFunc, freeValueFunc, mallocFunc, freeFunc api.Function, contextPtr int32, jsCode string) {
	// Allocate and write code string
	codeStrPtr := allocateString(ctx, memoryAPI, mallocFunc, jsCode)
	defer freeFunc.Call(ctx, uint64(codeStrPtr))

	// Allocate and write filename
	filenamePtr := allocateString(ctx, memoryAPI, mallocFunc, "file://eval")
	defer freeFunc.Call(ctx, uint64(filenamePtr))

	// Evaluate the code
	resultPtrResult, err := evalFunc.Call(ctx, uint64(contextPtr), uint64(codeStrPtr), uint64(len(jsCode)), uint64(filenamePtr), 0, 0)
	check(err)
	valuePtr := int32(resultPtrResult[0])

	// Free the result value
	if valuePtr != 0 {
		_, err = freeValueFunc.Call(ctx, uint64(contextPtr), uint64(valuePtr))
		check(err)
	}
}

// cleanup frees the Hako context and runtime
func cleanup(ctx context.Context, instance api.Module, contextPtr, runtimePtr int32) {
	if freeContextFunc := instance.ExportedFunction("HAKO_FreeContext"); freeContextFunc != nil {
		freeContextFunc.Call(ctx, uint64(contextPtr))
	}
	if freeRuntimeFunc := instance.ExportedFunction("HAKO_FreeRuntime"); freeRuntimeFunc != nil {
		freeRuntimeFunc.Call(ctx, uint64(runtimePtr))
	}
}

// requireFunc returns an error if the function is nil
func requireFunc(fn api.Function, name string) error {
	if fn == nil {
		return fmt.Errorf("%s function not found", name)
	}
	return nil
}

// readString reads a null-terminated string from WebAssembly memory
func readString(memory api.Memory, ptr int32) string {
	if ptr == 0 {
		return ""
	}
	buf, ok := memory.Read(uint32(ptr), 1024*1024) // Read up to 1MB max
	if !ok {
		return ""
	}
	for i, b := range buf {
		if b == 0 {
			return string(buf[:i])
		}
	}
	return string(buf)
}

// allocateString allocates a null-terminated string in WebAssembly memory
func allocateString(ctx context.Context, memory api.Memory, mallocFunc api.Function, s string) int32 {
	strAllocResult, err := mallocFunc.Call(ctx, uint64(len(s)+1))
	check(err)
	strPtr := int32(strAllocResult[0])

	if !memory.Write(uint32(strPtr), []byte(s)) {
		panic("failed to write string to memory")
	}
	if !memory.WriteByte(uint32(strPtr+int32(len(s))), 0) {
		panic("failed to write null terminator")
	}
	return strPtr
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func setupPrintFunction(ctx context.Context, instance api.Module, contextPtr int32, mallocFunc, freeFunc api.Function) {
	setupGlobalFunction(ctx, instance, contextPtr, mallocFunc, freeFunc, "print", 1)
}

func setupReadlineFunction(ctx context.Context, instance api.Module, contextPtr int32, mallocFunc, freeFunc api.Function) {
	setupGlobalFunction(ctx, instance, contextPtr, mallocFunc, freeFunc, "readline", 2)
}

// setupGlobalFunction registers a native function in the JavaScript global object
func setupGlobalFunction(ctx context.Context, instance api.Module, contextPtr int32, mallocFunc, freeFunc api.Function, name string, funcId int32) {
	newFunctionFunc := instance.ExportedFunction("HAKO_NewFunction")
	check(requireFunc(newFunctionFunc, "HAKO_NewFunction"))
	getGlobalFunc := instance.ExportedFunction("HAKO_GetGlobalObject")
	check(requireFunc(getGlobalFunc, "HAKO_GetGlobalObject"))
	setPropFunc := instance.ExportedFunction("HAKO_SetProp")
	check(requireFunc(setPropFunc, "HAKO_SetProp"))
	freeValueFunc := instance.ExportedFunction("HAKO_FreeValuePointer")
	check(requireFunc(freeValueFunc, "HAKO_FreeValuePointer"))
	newStringFunc := instance.ExportedFunction("HAKO_NewString")
	check(requireFunc(newStringFunc, "HAKO_NewString"))

	namePtr := allocateString(ctx, instance.Memory(), mallocFunc, name)
	defer func() {
		_, err := freeFunc.Call(ctx, uint64(namePtr))
		check(err)
	}()

	funcPtrResult, err := newFunctionFunc.Call(ctx, uint64(contextPtr), uint64(funcId), uint64(namePtr))
	check(err)
	funcValuePtr := int32(funcPtrResult[0])
	defer func() {
		_, err := freeValueFunc.Call(ctx, uint64(contextPtr), uint64(funcValuePtr))
		check(err)
	}()

	globalPtrResult, err := getGlobalFunc.Call(ctx, uint64(contextPtr))
	check(err)
	globalObjPtr := int32(globalPtrResult[0])
	defer func() {
		_, err := freeValueFunc.Call(ctx, uint64(contextPtr), uint64(globalObjPtr))
		check(err)
	}()

	propNamePtr := allocateString(ctx, instance.Memory(), mallocFunc, name)
	defer func() {
		_, err := freeFunc.Call(ctx, uint64(propNamePtr))
		check(err)
	}()

	propNameValuePtrResult, err := newStringFunc.Call(ctx, uint64(contextPtr), uint64(propNamePtr))
	check(err)
	propNameValue := int32(propNameValuePtrResult[0])
	defer func() {
		_, err := freeValueFunc.Call(ctx, uint64(contextPtr), uint64(propNameValue))
		check(err)
	}()

	_, err = setPropFunc.Call(ctx, uint64(contextPtr), uint64(globalObjPtr), uint64(propNameValue), uint64(funcValuePtr))
	check(err)
}

func callFunction(ctxPtr, thisPtr, argc, argv, funcId int32) int32 {
	switch funcId {
	case 1: // print()
		return handlePrint(ctxPtr, argc, argv)
	case 2: // readline()
		return handleReadline(ctxPtr)
	default:
		return 0
	}
}

func interruptHandler(rtPtr, ctxPtr, opaque int32) int32 { return 0 }
func loadModule(rtPtr, ctxPtr, moduleNamePtr, opaque, attributes int32) int32 { return 0 }
func normalizeModule(rtPtr, ctxPtr, baseNamePtr, moduleNamePtr, opaque int32) int32 {
	return moduleNamePtr
}
func resolveModule(rtPtr, ctxPtr, moduleNamePtr, currentModulePtr, opaquePtr int32) int32 { return 0 }
func profileFunctionStart(ctxPtr, eventPtr, opaque int32) {}
func profileFunctionEnd(ctxPtr, eventPtr, opaque int32) {}
func moduleInit(ctxPtr, m int32) int32 { return 0 }
func classConstructor(ctxPtr, newTargetPtr, argc, argv, classId int32) int32 { return 0 }
func classFinalizer(rtPtr, opaque, classId int32) {}

func handlePrint(ctxPtr int32, argc int32, argv int32) int32 {
	ctx := context.Background()

	getStringFunc := instanceAPI.ExportedFunction("HAKO_ToCString")
	freeCStringFunc := instanceAPI.ExportedFunction("HAKO_FreeCString")
	argvGetFunc := instanceAPI.ExportedFunction("HAKO_ArgvGetJSValueConstPointer")
	getUndefinedFunc := instanceAPI.ExportedFunction("HAKO_GetUndefined")

	if getStringFunc == nil || freeCStringFunc == nil || argvGetFunc == nil || getUndefinedFunc == nil {
		return 0
	}

	for i := int32(0); i < argc; i++ {
		argPtrResult, err := argvGetFunc.Call(ctx, uint64(argv), uint64(i))
		if err != nil {
			continue
		}
		argPtr := int32(argPtrResult[0])

		strPtrResult, err := getStringFunc.Call(ctx, uint64(ctxPtr), uint64(argPtr))
		if err != nil {
			continue
		}
		strPtr := int32(strPtrResult[0])

		if strPtr != 0 {
			str := readString(memoryAPI, strPtr)
			if i > 0 {
				fmt.Print(" ")
			}
			fmt.Print(str)
			freeCStringFunc.Call(ctx, uint64(ctxPtr), uint64(strPtr))
		}
	}
	fmt.Println()

	undefinedPtrResult, err := getUndefinedFunc.Call(ctx)
	if err != nil {
		return 0
	}
	return int32(undefinedPtrResult[0])
}

func handleReadline(ctxPtr int32) int32 {
	ctx := context.Background()

	newStringFunc := instanceAPI.ExportedFunction("HAKO_NewString")
	getNullFunc := instanceAPI.ExportedFunction("HAKO_GetNull")

	if newStringFunc == nil || getNullFunc == nil {
		return 0
	}

	fmt.Print("hako> ")

	line, err := stdinReader.ReadString('\n')
	if err != nil {
		nullPtrResult, _ := getNullFunc.Call(ctx)
		return int32(nullPtrResult[0])
	}

	line = trimNewline(line)

	linePtr := allocateString(ctx, memoryAPI, mallocFunc, line)
	stringValueResult, _ := newStringFunc.Call(ctx, uint64(ctxPtr), uint64(linePtr))
	return int32(stringValueResult[0])
}

func trimNewline(s string) string {
	if len(s) > 0 && s[len(s)-1] == '\n' {
		s = s[:len(s)-1]
	}
	if len(s) > 0 && s[len(s)-1] == '\r' {
		s = s[:len(s)-1]
	}
	return s
}
