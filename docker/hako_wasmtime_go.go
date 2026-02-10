// REPL and script runner for Hako using wasmtime-go runtime.
// Faster on amd64 / slower on arm64.
//
// Original prototype: https://gist.github.com/andrewmd5/197efb527ef40131c34ca12fd6d0a61e
//
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

package main

import (
	"bufio"
	_ "embed"
	"fmt"
	"io"
	"os"
	"strings"

	"github.com/bytecodealliance/wasmtime-go/v41"
)

const (
	initialMemoryPages = 25165824 / 65536  // 24 MiB
	maximumMemoryPages = 268435456 / 65536 // 256 MiB
)

//go:embed repl.js
var replJS string

//go:embed hako.wasm
var wasmBytes []byte

type runner struct {
	store    *wasmtime.Store
	instance *wasmtime.Instance
	memory   *wasmtime.Memory
	malloc   *wasmtime.Func
	free     *wasmtime.Func
	stdin    *bufio.Reader
}

func main() {
	r, err := newRunner()
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}

	runtimePtr, contextPtr, err := r.createRuntimeAndContext()
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	defer r.cleanup(contextPtr, runtimePtr)
	if err := r.setupGlobals(contextPtr); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}

	args := os.Args[1:]
	if len(args) > 0 {
		for _, path := range args {
			if !r.runFile(contextPtr, path) {
				os.Exit(1)
			}
		}
		return
	}

	if !r.runRepl(contextPtr) {
		os.Exit(1)
	}
}

func newRunner() (*runner, error) {
	engine := wasmtime.NewEngine()
	store := wasmtime.NewStore(engine)

	wasiCfg := wasmtime.NewWasiConfig()
	store.SetWasi(wasiCfg)

	linker := wasmtime.NewLinker(engine)
	if err := linker.DefineWasi(); err != nil {
		return nil, err
	}

	memType, err := wasmtime.NewMemoryType(initialMemoryPages, true, maximumMemoryPages, false)
	if err != nil {
		return nil, err
	}
	mem, err := wasmtime.NewMemory(store, memType)
	if err != nil {
		return nil, err
	}
	if err := linker.Define(store, "env", "memory", mem); err != nil {
		return nil, err
	}

	r := &runner{
		store:  store,
		memory: mem,
		stdin:  bufio.NewReader(os.Stdin),
	}

	if err := r.instantiateHostModule(linker); err != nil {
		return nil, err
	}

	module, err := wasmtime.NewModule(engine, wasmBytes)
	if err != nil {
		return nil, err
	}
	instance, err := linker.Instantiate(store, module)
	if err != nil {
		return nil, err
	}
	r.instance = instance

	if initFn := instance.GetFunc(store, "_initialize"); initFn != nil {
		if _, err := initFn.Call(store); err != nil {
			return nil, err
		}
	}

	r.malloc = r.requiredFunc("malloc")
	r.free = r.requiredFunc("free")
	return r, nil
}

func (r *runner) instantiateHostModule(linker *wasmtime.Linker) error {
	if err := linker.Define(r.store, "hako", "call_function",
		wasmtime.WrapFunc(r.store, func(jsCtx, thisArg, argc, argv, funcID int32) int32 {
			return r.handleCallFunction(jsCtx, funcID, thisArg, argc, argv)
		}),
	); err != nil {
		return err
	}
	if err := linker.Define(r.store, "hako", "interrupt_handler",
		wasmtime.WrapFunc(r.store, func(rtPtr, ctxPtr, opaque int32) int32 { return 0 }),
	); err != nil {
		return err
	}
	if err := linker.Define(r.store, "hako", "load_module",
		wasmtime.WrapFunc(r.store, func(rtPtr, ctxPtr, moduleNamePtr, opaque, attributes int32) int32 { return 0 }),
	); err != nil {
		return err
	}
	if err := linker.Define(r.store, "hako", "normalize_module",
		wasmtime.WrapFunc(r.store, func(rtPtr, ctxPtr, baseNamePtr, moduleNamePtr, opaque int32) int32 { return moduleNamePtr }),
	); err != nil {
		return err
	}
	if err := linker.Define(r.store, "hako", "module_init",
		wasmtime.WrapFunc(r.store, func(ctxPtr, m int32) int32 { return 0 }),
	); err != nil {
		return err
	}
	if err := linker.Define(r.store, "hako", "class_constructor",
		wasmtime.WrapFunc(r.store, func(ctxPtr, newTargetPtr, argc, argv, classID int32) int32 { return 0 }),
	); err != nil {
		return err
	}
	if err := linker.Define(r.store, "hako", "class_finalizer",
		wasmtime.WrapFunc(r.store, func(rtPtr, opaque, classID int32) {}),
	); err != nil {
		return err
	}
	if err := linker.Define(r.store, "hako", "class_gc_mark",
		wasmtime.WrapFunc(r.store, func(rtPtr, opaque, classID, markFunc int32) {}),
	); err != nil {
		return err
	}
	if err := linker.Define(r.store, "hako", "promise_rejection_tracker",
		wasmtime.WrapFunc(r.store, func(ctxPtr, promisePtr, reasonPtr, isHandled, opaque int32) {}),
	); err != nil {
		return err
	}
	return nil
}

func (r *runner) createRuntimeAndContext() (int32, int32, error) {
	runtimePtr, err := r.callInt32("HAKO_NewRuntime")
	if err != nil {
		return 0, 0, err
	}

	contextPtr, err := r.callInt32("HAKO_NewContext", runtimePtr, int32(0xFFFF))
	if err != nil {
		return 0, 0, err
	}

	return runtimePtr, contextPtr, nil
}

func (r *runner) setupGlobals(contextPtr int32) error {
	if err := r.setupGlobalFunction(contextPtr, "print", 1); err != nil {
		return err
	}
	if err := r.setupGlobalFunction(contextPtr, "putstr", 2); err != nil {
		return err
	}
	if err := r.setupGlobalFunction(contextPtr, "readline", 3); err != nil {
		return err
	}
	if err := r.eval(contextPtr, "globalThis.console = { log: print };", "globals.js"); err != nil {
		return err
	}
	return nil
}

func (r *runner) runFile(contextPtr int32, path string) bool {
	scriptBytes, err := os.ReadFile(path)
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		return false
	}
	if err := r.eval(contextPtr, string(scriptBytes), path); err != nil {
		fmt.Fprintln(os.Stderr, err)
		return false
	}
	return true
}

func (r *runner) runRepl(contextPtr int32) bool {
	if err := r.eval(contextPtr, replJS, "repl.js"); err != nil {
		fmt.Fprintln(os.Stderr, err)
		return false
	}
	return true
}

func (r *runner) cleanup(contextPtr int32, runtimePtr int32) {
	if freeContext := r.instance.GetFunc(r.store, "HAKO_FreeContext"); freeContext != nil {
		_, _ = freeContext.Call(r.store, contextPtr)
	}
	if freeRuntime := r.instance.GetFunc(r.store, "HAKO_FreeRuntime"); freeRuntime != nil {
		_, _ = freeRuntime.Call(r.store, runtimePtr)
	}
}

func (r *runner) eval(contextPtr int32, jsCode string, filename string) error {
	evalFunc := r.requiredFunc("HAKO_Eval")
	freeValueFunc := r.requiredFunc("HAKO_FreeValuePointer")

	codePtr, err := r.allocateString(jsCode)
	if err != nil {
		return err
	}
	defer r.free.Call(r.store, codePtr)

	filePtr, err := r.allocateString(filename)
	if err != nil {
		return err
	}
	defer r.free.Call(r.store, filePtr)

	ret, err := evalFunc.Call(r.store, contextPtr, codePtr, int32(len(jsCode)), filePtr, int32(0), int32(0))
	if err != nil {
		return err
	}
	valuePtr, err := asInt32(ret)
	if err != nil {
		return err
	}
	if valuePtr != 0 {
		_, err = freeValueFunc.Call(r.store, contextPtr, valuePtr)
		if err != nil {
			return err
		}
	}
	return nil
}

func (r *runner) setupGlobalFunction(contextPtr int32, name string, funcID int32) error {
	newFunctionFunc := r.requiredFunc("HAKO_NewFunction")
	getGlobalFunc := r.requiredFunc("HAKO_GetGlobalObject")
	setPropFunc := r.requiredFunc("HAKO_SetProp")
	freeValueFunc := r.requiredFunc("HAKO_FreeValuePointer")
	newStringFunc := r.requiredFunc("HAKO_NewString")

	namePtr, err := r.allocateString(name)
	if err != nil {
		return err
	}
	defer r.free.Call(r.store, namePtr)

	fnAny, err := newFunctionFunc.Call(r.store, contextPtr, funcID, namePtr)
	if err != nil {
		return err
	}
	fnPtr, err := asInt32(fnAny)
	if err != nil {
		return err
	}
	if fnPtr == 0 {
		return fmt.Errorf("HAKO_NewFunction failed for %s", name)
	}
	defer freeValueFunc.Call(r.store, contextPtr, fnPtr)

	globalAny, err := getGlobalFunc.Call(r.store, contextPtr)
	if err != nil {
		return err
	}
	globalPtr, err := asInt32(globalAny)
	if err != nil {
		return err
	}
	if globalPtr == 0 {
		return fmt.Errorf("HAKO_GetGlobalObject failed")
	}
	defer freeValueFunc.Call(r.store, contextPtr, globalPtr)

	propNamePtr, err := r.allocateString(name)
	if err != nil {
		return err
	}
	defer r.free.Call(r.store, propNamePtr)

	propAny, err := newStringFunc.Call(r.store, contextPtr, propNamePtr)
	if err != nil {
		return err
	}
	propPtr, err := asInt32(propAny)
	if err != nil {
		return err
	}
	if propPtr == 0 {
		return fmt.Errorf("HAKO_NewString failed")
	}
	defer freeValueFunc.Call(r.store, contextPtr, propPtr)

	setPropAny, err := setPropFunc.Call(r.store, contextPtr, globalPtr, propPtr, fnPtr)
	if err != nil {
		return err
	}
	setPropRet, err := asInt32(setPropAny)
	if err != nil {
		return err
	}
	if setPropRet < 0 {
		return fmt.Errorf("HAKO_SetProp failed for %s", name)
	}
	return nil
}

func (r *runner) handleCallFunction(ctxPtr int32, funcID, thisArg, argc, argv int32) int32 {
	_ = thisArg
	switch funcID {
	case 1: // print
		fmt.Fprintln(os.Stdout, strings.Join(r.argvToStrings(ctxPtr, argc, argv), " "))
		return r.callInt32NoError("HAKO_GetUndefined")
	case 2: // putstr
		fmt.Fprint(os.Stdout, strings.Join(r.argvToStrings(ctxPtr, argc, argv), " "))
		return r.callInt32NoError("HAKO_GetUndefined")
	case 3: // readline
		line, err := r.stdin.ReadString('\n')
		if err != nil && err != io.EOF {
			return r.callInt32NoError("HAKO_GetNull")
		}
		if err == io.EOF && line == "" {
			return r.callInt32NoError("HAKO_GetNull")
		}
		line = strings.TrimRight(line, "\r\n")

		linePtr, err := r.allocateString(line)
		if err != nil {
			return r.callInt32NoError("HAKO_GetNull")
		}
		defer r.free.Call(r.store, linePtr)

		newString := r.requiredFunc("HAKO_NewString")
		ret, err := newString.Call(r.store, ctxPtr, linePtr)
		if err != nil {
			return r.callInt32NoError("HAKO_GetNull")
		}
		v, err := asInt32(ret)
		if err != nil {
			return r.callInt32NoError("HAKO_GetNull")
		}
		return v
	default:
		return 0
	}
}

func (r *runner) argvToStrings(ctxPtr int32, argc, argv int32) []string {
	argvGet := r.requiredFunc("HAKO_ArgvGetJSValueConstPointer")
	toCString := r.requiredFunc("HAKO_ToCString")
	freeCString := r.requiredFunc("HAKO_FreeCString")

	parts := make([]string, 0, argc)
	for i := int32(0); i < argc; i++ {
		argAny, err := argvGet.Call(r.store, argv, i)
		if err != nil {
			continue
		}
		argPtr, err := asInt32(argAny)
		if err != nil {
			continue
		}

		strAny, err := toCString.Call(r.store, ctxPtr, argPtr)
		if err != nil {
			continue
		}
		strPtr, err := asInt32(strAny)
		if err != nil || strPtr == 0 {
			continue
		}

		parts = append(parts, r.readString(strPtr))
		_, _ = freeCString.Call(r.store, ctxPtr, strPtr)
	}
	return parts
}

func (r *runner) requiredFunc(name string) *wasmtime.Func {
	fn := r.instance.GetFunc(r.store, name)
	if fn == nil {
		panic(fmt.Errorf("%s function not found", name))
	}
	return fn
}

func (r *runner) callInt32(name string, args ...int32) (int32, error) {
	fn := r.requiredFunc(name)
	callArgs := make([]interface{}, 0, len(args))
	for _, arg := range args {
		callArgs = append(callArgs, arg)
	}
	ret, err := fn.Call(r.store, callArgs...)
	if err != nil {
		return 0, err
	}
	return asInt32(ret)
}

func (r *runner) callInt32NoError(name string, args ...int32) int32 {
	v, err := r.callInt32(name, args...)
	if err != nil {
		return 0
	}
	return v
}

func (r *runner) allocateString(s string) (int32, error) {
	allocAny, err := r.malloc.Call(r.store, int32(len(s)+1))
	if err != nil {
		return 0, err
	}
	ptr, err := asInt32(allocAny)
	if err != nil {
		return 0, err
	}

	data := r.memory.UnsafeData(r.store)
	if int(ptr) < 0 || int(ptr)+len(s)+1 > len(data) {
		return 0, fmt.Errorf("out of bounds write")
	}
	copy(data[ptr:ptr+int32(len(s))], s)
	data[ptr+int32(len(s))] = 0
	return ptr, nil
}

func (r *runner) readString(ptr int32) string {
	if ptr == 0 {
		return ""
	}
	data := r.memory.UnsafeData(r.store)
	if ptr < 0 || int(ptr) >= len(data) {
		return ""
	}
	for i := ptr; i < int32(len(data)); i++ {
		if data[i] == 0 {
			return string(data[ptr:i])
		}
	}
	return ""
}

func asInt32(v interface{}) (int32, error) {
	switch value := v.(type) {
	case int32:
		return value, nil
	case int64:
		return int32(value), nil
	default:
		return 0, fmt.Errorf("unexpected wasm result type: %T", v)
	}
}
