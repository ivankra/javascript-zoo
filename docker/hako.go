// Based on https://gist.github.com/andrewmd5/197efb527ef40131c34ca12fd6d0a61e
// And further expanded into REPL/script runner by LLM
package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"

	"github.com/bytecodealliance/wasmtime-go/v31"
)

// Default memory configuration (matching JavaScript defaults)
const (
	defaultInitialMemory = 25165824  // 24MB
	defaultMaximumMemory = 268435456 // 256MB
)

func main() {
	// Load the WebAssembly module
	exePath, err := os.Executable()
	check(err)
	wasmPath := filepath.Join(filepath.Dir(exePath), "hako.wasm")
	wasmBytes, err := os.ReadFile(wasmPath)
	check(err)

	// Set up the Wasmtime environment
	engine := wasmtime.NewEngine()
	store := wasmtime.NewStore(engine)

	// Create a linker for imports
	linker := wasmtime.NewLinker(engine)

	// Set up WASI
	wasiConfig := wasmtime.NewWasiConfig()
	store.SetWasi(wasiConfig)

	// Define WASI imports
	err = linker.DefineWasi()
	check(err)

	// Create memory configuration (convert bytes to pages)
	initialPages := defaultInitialMemory / 65536
	maximumPages := defaultMaximumMemory / 65536

	// Create memory type and memory instance
	memoryType := wasmtime.NewMemoryType(uint32(initialPages), true, uint32(maximumPages), false)
	memory, err := wasmtime.NewMemory(store, memoryType)
	check(err)

	// Define memory in the "env" namespace
	err = linker.Define(store, "env", "memory", memory)
	check(err)

	// Create placeholders for functions needed in callbacks
	var instance *wasmtime.Instance
	var mallocFunc *wasmtime.Func

	// Define the Hako callback functions in the "hako" namespace
	err = linker.Define(
		store,
		"hako",
		"call_function",
		wasmtime.WrapFunc(
			store,
			func(ctxPtr int32, thisPtr int32, argc int32, argv int32, funcId int32) int32 {
				if instance == nil || mallocFunc == nil {
					return 0
				}
				return handleCallFunction(store, memory, instance, ctxPtr, thisPtr, argc, argv, funcId, mallocFunc)
			},
		),
	)
	check(err)

	err = linker.Define(
		store,
		"hako",
		"interrupt_handler",
		wasmtime.WrapFunc(
			store,
			func(rtPtr int32, ctxPtr int32, opaque int32) int32 {
				return 0
			},
		),
	)
	check(err)

	err = linker.Define(
		store,
		"hako",
		"load_module",
		wasmtime.WrapFunc(
			store,
			func(rtPtr int32, ctxPtr int32, moduleNamePtr int32, opaque int32, attributes int32) int32 {
				return 0
			},
		),
	)
	check(err)

	err = linker.Define(
		store,
		"hako",
		"normalize_module",
		wasmtime.WrapFunc(
			store,
			func(rtPtr int32, ctxPtr int32, baseNamePtr int32, moduleNamePtr int32, opaque int32) int32 {
				return moduleNamePtr
			},
		),
	)
	check(err)

	err = linker.Define(
		store,
		"hako",
		"resolve_module",
		wasmtime.WrapFunc(
			store,
			func(rtPtr int32, ctxPtr int32, moduleNamePtr int32, currentModulePtr int32, opaquePtr int32) int32 {
				return 0
			},
		),
	)
	check(err)

	err = linker.Define(
		store,
		"hako",
		"profile_function_start",
		wasmtime.WrapFunc(
			store,
			func(ctxPtr int32, eventPtr int32, opaque int32) {
			},
		),
	)
	check(err)

	err = linker.Define(
		store,
		"hako",
		"profile_function_end",
		wasmtime.WrapFunc(
			store,
			func(ctxPtr int32, eventPtr int32, opaque int32) {
			},
		),
	)
	check(err)

	err = linker.Define(
		store,
		"hako",
		"module_init",
		wasmtime.WrapFunc(
			store,
			func(ctxPtr int32, m int32) int32 {
				return 0
			},
		),
	)
	check(err)

	err = linker.Define(
		store,
		"hako",
		"class_constructor",
		wasmtime.WrapFunc(
			store,
			func(ctxPtr int32, newTargetPtr int32, argc int32, argv int32, classId int32) int32 {
				return 0
			},
		),
	)
	check(err)

	err = linker.Define(
		store,
		"hako",
		"class_finalizer",
		wasmtime.WrapFunc(
			store,
			func(rtPtr int32, opaque int32, classId int32) {
			},
		),
	)
	check(err)

	// Create the module
	module, err := wasmtime.NewModule(engine, wasmBytes)
	check(err)

	// Instantiate the module
	instance, err = linker.Instantiate(store, module)
	check(err)

	// Call the initialization function if it exists
	initFunc := instance.GetFunc(store, "_initialize")
	if initFunc != nil {
		_, err = initFunc.Call(store)
		check(err)
		//fmt.Println("Module initialized successfully")
	} else {
		fmt.Println("Module loaded successfully")
	}

	// Get memory management functions
	mallocFunc = instance.GetFunc(store, "malloc")
	if mallocFunc == nil {
		panic("malloc function not found")
	}

	freeFunc := instance.GetFunc(store, "free")
	if freeFunc == nil {
		panic("free function not found")
	}

	// Create a new runtime
	newRuntimeFunc := instance.GetFunc(store, "HAKO_NewRuntime")
	if newRuntimeFunc == nil {
		panic("HAKO_NewRuntime function not found")
	}

	rtPtr, err := newRuntimeFunc.Call(store)
	check(err)
	runtimePtr := rtPtr.(int32)

	// Enable all intrinsics for full JavaScript support
	allIntrinsics := 0xFFFF

	// Create a new context
	newContextFunc := instance.GetFunc(store, "HAKO_NewContext")
	if newContextFunc == nil {
		panic("HAKO_NewContext function not found")
	}

	ctxPtr, err := newContextFunc.Call(store, runtimePtr, allIntrinsics)
	check(err)
	contextPtr := ctxPtr.(int32)

	setupPrintFunction(store, instance, memory, contextPtr, mallocFunc, freeFunc)
	setupReadlineFunction(store, instance, memory, contextPtr, mallocFunc, freeFunc)

	// Get necessary functions for evaluation
	evalFunc := instance.GetFunc(store, "HAKO_Eval")
	if evalFunc == nil {
		panic("HAKO_Eval function not found")
	}

	getStringFunc := instance.GetFunc(store, "HAKO_ToCString")
	if getStringFunc == nil {
		panic("HAKO_ToCString function not found")
	}

	freeValueFunc := instance.GetFunc(store, "HAKO_FreeValuePointer")
	if freeValueFunc == nil {
		panic("HAKO_FreeValuePointer function not found")
	}

	freeCStringFunc := instance.GetFunc(store, "HAKO_FreeCString")
	if freeCStringFunc == nil {
		panic("HAKO_FreeCString function not found")
	}

	// Read JavaScript code from file or pass REPL code
	var jsCode string
	if len(os.Args) > 1 {
		scriptPath := os.Args[1]
		scriptBytes, err := os.ReadFile(scriptPath)
		check(err)
		jsCode = string(scriptBytes)
	} else {
		jsCode = `while (true) {
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

	// Allocate memory for the code string using malloc
	codeStrAlloc, err := mallocFunc.Call(store, len(jsCode)+1) // +1 for null terminator
	check(err)
	codeStrPtr := codeStrAlloc.(int32)
	defer func() {
		_, err := freeFunc.Call(store, codeStrPtr)
		check(err)
	}()

	// Write the string to memory
	data := memory.UnsafeData(store)
	for i := 0; i < len(jsCode); i++ {
		data[codeStrPtr+int32(i)] = jsCode[i]
	}
	data[codeStrPtr+int32(len(jsCode))] = 0 // Null terminator

	// Allocate memory for the filename
	filenameStr := "file://eval"
	filenameAlloc, err := mallocFunc.Call(store, len(filenameStr)+1)
	check(err)
	filenamePtr := filenameAlloc.(int32)
	defer func() {
		_, err := freeFunc.Call(store, filenamePtr)
		check(err)
	}()

	// Write the filename to memory
	for i := 0; i < len(filenameStr); i++ {
		data[filenamePtr+int32(i)] = filenameStr[i]
	}
	data[filenamePtr+int32(len(filenameStr))] = 0 // Null terminator

	// Call HAKO_Eval to evaluate the JavaScript code
	resultPtr, err := evalFunc.Call(store, contextPtr, codeStrPtr, len(jsCode), filenamePtr, 0, 0)
	check(err)
	valuePtr := resultPtr.(int32)

	// Handle the result
	if valuePtr != 0 {
		// Free the eval result
		_, err = freeValueFunc.Call(store, contextPtr, valuePtr)
		check(err)
	}

	// Clean up the context and runtime
	freeContextFunc := instance.GetFunc(store, "HAKO_FreeContext")
	if freeContextFunc != nil {
		_, err = freeContextFunc.Call(store, contextPtr)
		check(err)
	}

	freeRuntimeFunc := instance.GetFunc(store, "HAKO_FreeRuntime")
	if freeRuntimeFunc != nil {
		_, err = freeRuntimeFunc.Call(store, runtimePtr)
		check(err)
	}
}

// Helper function to read a string from WebAssembly memory
func readString(store *wasmtime.Store, memory *wasmtime.Memory, ptr int32) string {
	if ptr == 0 {
		return ""
	}

	// Get the memory data
	data := memory.UnsafeData(store)

	// Find the null terminator to determine string length
	length := 0
	for ptr+int32(length) < int32(len(data)) && data[ptr+int32(length)] != 0 {
		length++
	}

	// Convert the bytes to a string
	bytes := make([]byte, length)
	for i := 0; i < length; i++ {
		bytes[i] = data[ptr+int32(i)]
	}

	return string(bytes)
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func setupPrintFunction(store *wasmtime.Store, instance *wasmtime.Instance, memory *wasmtime.Memory, contextPtr int32, mallocFunc, freeFunc *wasmtime.Func) {
	setupGlobalFunction(store, instance, memory, contextPtr, mallocFunc, freeFunc, "print", 1)
}

func setupReadlineFunction(store *wasmtime.Store, instance *wasmtime.Instance, memory *wasmtime.Memory, contextPtr int32, mallocFunc, freeFunc *wasmtime.Func) {
	setupGlobalFunction(store, instance, memory, contextPtr, mallocFunc, freeFunc, "readline", 2)
}

// setupGlobalFunction registers a native function in the JavaScript global object
func setupGlobalFunction(store *wasmtime.Store, instance *wasmtime.Instance, memory *wasmtime.Memory, contextPtr int32, mallocFunc, freeFunc *wasmtime.Func, name string, funcId int32) {
	newFunctionFunc := instance.GetFunc(store, "HAKO_NewFunction")
	if newFunctionFunc == nil {
		panic("HAKO_NewFunction not found")
	}

	getGlobalFunc := instance.GetFunc(store, "HAKO_GetGlobalObject")
	if getGlobalFunc == nil {
		panic("HAKO_GetGlobalObject not found")
	}

	setPropFunc := instance.GetFunc(store, "HAKO_SetProp")
	if setPropFunc == nil {
		panic("HAKO_SetProp not found")
	}

	freeValueFunc := instance.GetFunc(store, "HAKO_FreeValuePointer")
	if freeValueFunc == nil {
		panic("HAKO_FreeValuePointer not found")
	}

	newStringFunc := instance.GetFunc(store, "HAKO_NewString")
	if newStringFunc == nil {
		panic("HAKO_NewString not found")
	}

	namePtr := allocateString(store, memory, mallocFunc, name)
	defer func() {
		_, err := freeFunc.Call(store, namePtr)
		check(err)
	}()

	// Create native function
	funcPtr, err := newFunctionFunc.Call(store, contextPtr, funcId, namePtr)
	check(err)
	funcValuePtr := funcPtr.(int32)
	defer func() {
		_, err := freeValueFunc.Call(store, contextPtr, funcValuePtr)
		check(err)
	}()

	// Get global object
	globalPtr, err := getGlobalFunc.Call(store, contextPtr)
	check(err)
	globalObjPtr := globalPtr.(int32)
	defer func() {
		_, err := freeValueFunc.Call(store, contextPtr, globalObjPtr)
		check(err)
	}()

	// Create string value for property name
	propNamePtr := allocateString(store, memory, mallocFunc, name)
	defer func() {
		_, err := freeFunc.Call(store, propNamePtr)
		check(err)
	}()

	propNameValuePtr, err := newStringFunc.Call(store, contextPtr, propNamePtr)
	check(err)
	propNameValue := propNameValuePtr.(int32)
	defer func() {
		_, err := freeValueFunc.Call(store, contextPtr, propNameValue)
		check(err)
	}()

	// Set the function on the global object
	_, err = setPropFunc.Call(store, contextPtr, globalObjPtr, propNameValue, funcValuePtr)
	check(err)
}

// allocateString allocates a string in WebAssembly memory and returns a pointer to it
func allocateString(store *wasmtime.Store, memory *wasmtime.Memory, mallocFunc *wasmtime.Func, s string) int32 {
	strAlloc, err := mallocFunc.Call(store, len(s)+1)
	check(err)
	strPtr := strAlloc.(int32)

	data := memory.UnsafeData(store)
	for i := 0; i < len(s); i++ {
		data[strPtr+int32(i)] = s[i]
	}
	data[strPtr+int32(len(s))] = 0

	return strPtr
}

var stdinReader = bufio.NewReader(os.Stdin)

// handleCallFunction is the callback for JavaScript-to-Go function calls
func handleCallFunction(store *wasmtime.Store, memory *wasmtime.Memory, instance *wasmtime.Instance, ctxPtr int32, thisPtr int32, argc int32, argv int32, funcId int32, mallocFunc *wasmtime.Func) int32 {
	switch funcId {
	case 1:
		return handlePrint(store, memory, instance, ctxPtr, argc, argv, mallocFunc)
	case 2:
		return handleReadline(store, memory, instance, ctxPtr, mallocFunc)
	default:
		return 0
	}
}

// handlePrint implements the print() function
func handlePrint(store *wasmtime.Store, memory *wasmtime.Memory, instance *wasmtime.Instance, ctxPtr int32, argc int32, argv int32, mallocFunc *wasmtime.Func) int32 {
	getStringFunc := instance.GetFunc(store, "HAKO_ToCString")
	if getStringFunc == nil {
		return 0
	}

	freeCStringFunc := instance.GetFunc(store, "HAKO_FreeCString")
	if freeCStringFunc == nil {
		return 0
	}

	argvGetFunc := instance.GetFunc(store, "HAKO_ArgvGetJSValueConstPointer")
	if argvGetFunc == nil {
		return 0
	}

	getUndefinedFunc := instance.GetFunc(store, "HAKO_GetUndefined")
	if getUndefinedFunc == nil {
		return 0
	}

	for i := int32(0); i < argc; i++ {
		// Get pointer to argument
		argPtrResult, err := argvGetFunc.Call(store, argv, i)
		if err != nil {
			continue
		}
		argPtr := argPtrResult.(int32)

		// Convert argument to string
		strPtrResult, err := getStringFunc.Call(store, ctxPtr, argPtr)
		if err != nil {
			continue
		}
		strPtr := strPtrResult.(int32)

		if strPtr != 0 {
			// Read and print the string
			str := readString(store, memory, strPtr)
			if i > 0 {
				fmt.Print(" ")
			}
			fmt.Print(str)

			// Free the C string
			_, _ = freeCStringFunc.Call(store, ctxPtr, strPtr)
		}
	}
	fmt.Println()

	// Return undefined
	undefinedPtrResult, err := getUndefinedFunc.Call(store)
	if err != nil {
		return 0
	}
	return undefinedPtrResult.(int32)
}

// handleReadline implements the readline() function for REPL
func handleReadline(store *wasmtime.Store, memory *wasmtime.Memory, instance *wasmtime.Instance, ctxPtr int32, mallocFunc *wasmtime.Func) int32 {
	newStringFunc := instance.GetFunc(store, "HAKO_NewString")
	if newStringFunc == nil {
		return 0
	}

	getNullFunc := instance.GetFunc(store, "HAKO_GetNull")
	if getNullFunc == nil {
		return 0
	}

	fmt.Print("hako> ")

	line, err := stdinReader.ReadString('\n')
	if err != nil {
		nullPtrResult, err := getNullFunc.Call(store)
		if err != nil {
			return 0
		}
		return nullPtrResult.(int32)
	}

	if len(line) > 0 && line[len(line)-1] == '\n' {
		line = line[:len(line)-1]
	}
	if len(line) > 0 && line[len(line)-1] == '\r' {
		line = line[:len(line)-1]
	}

	linePtr := allocateString(store, memory, mallocFunc, line)

	stringValueResult, err := newStringFunc.Call(store, ctxPtr, linePtr)
	if err != nil {
		return 0
	}

	return stringValueResult.(int32)
}
