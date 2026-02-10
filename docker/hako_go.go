// REPL and script runner for Hako using experimental Go host library
// from hako's `go` branch.
//
// Uses wazero runtime: zero dependency, CGO-free WASM runtime for Go.
//
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

package main

import (
	"bufio"
	"context"
	_ "embed"
	"fmt"
	"io"
	"os"
	"strings"

	"github.com/6over3/hako/hosts/go/hako"
)

//go:embed repl.js
var replJS string

//go:embed hako.wasm
var wasmBytes []byte

var stdinReader = bufio.NewReader(os.Stdin)

func main() {
	ctx := context.Background()

	rt, err := hako.New(ctx, wasmBytes, nil)
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	defer rt.Close()
	rt.Callbacks.CallFunctionHandler = handleCallFunction

	realm, err := rt.CreateRealm()
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	defer realm.Close()
	if err := setupGlobals(realm); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}

	args := os.Args[1:]
	if len(args) > 0 {
		for _, path := range args {
			if !runFile(realm, path) {
				os.Exit(1)
			}
		}
		return
	}

	if !runRepl(realm) {
		os.Exit(1)
	}
}

func runFile(realm *hako.Realm, path string) bool {
	source, err := os.ReadFile(path)
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		return false
	}

	result, err := realm.EvalCodeWithOptions(string(source), &hako.EvalOptions{
		Filename:     path,
		DetectModule: true,
	})
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		return false
	}
	defer result.Free()

	if !result.IsUndefined() {
		fmt.Println(result.String())
	}
	return true
}

func runRepl(realm *hako.Realm) bool {
	result, err := realm.EvalCode(replJS)
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		return false
	}
	result.Free()
	return true
}

func setupGlobals(realm *hako.Realm) error {
	if err := setupGlobalFunction(realm, "print", 1); err != nil {
		return err
	}
	if err := setupGlobalFunction(realm, "putstr", 2); err != nil {
		return err
	}
	if err := setupGlobalFunction(realm, "readline", 3); err != nil {
		return err
	}
	consoleInit, err := realm.EvalCode("globalThis.console = { log: print };")
	if err != nil {
		return err
	}
	consoleInit.Free()
	return nil
}

func handleCallFunction(realm *hako.Realm, funcID, thisArg, argc, argv int32) hako.ValuePtr {
	_ = thisArg
	ctx := context.Background()
	reg := realm.Runtime.Registry
	mem := realm.Runtime.Memory
	jsCtx := realm.Pointer

	switch funcID {
	case 1: // print
		fmt.Fprintln(os.Stdout, strings.Join(argvToStrings(ctx, reg, mem, jsCtx, argc, argv), " "))
		return reg.GetUndefined(ctx)
	case 2: // putstr
		fmt.Fprint(os.Stdout, strings.Join(argvToStrings(ctx, reg, mem, jsCtx, argc, argv), " "))
		return reg.GetUndefined(ctx)
	case 3: // readline
		line, err := stdinReader.ReadString('\n')
		if err != nil && err != io.EOF {
			return reg.GetNull(ctx)
		}
		if err == io.EOF && line == "" {
			return reg.GetNull(ctx)
		}
		line = strings.TrimRight(line, "\r\n")
		strPtr, _ := mem.AllocateString(jsCtx, line)
		if strPtr == 0 {
			return reg.GetNull(ctx)
		}
		defer mem.FreeMemory(jsCtx, strPtr)
		return reg.NewString(ctx, jsCtx, int32(strPtr))
	default:
		return 0
	}
}

func argvToStrings(ctx context.Context, reg *hako.Registry, mem *hako.MemoryManager, jsCtx hako.ContextPtr, argc, argv int32) []string {
	parts := make([]string, 0, argc)
	for i := int32(0); i < argc; i++ {
		argPtr := reg.ArgvGetJSValueConstPointer(ctx, hako.ValuePtr(argv), i)
		if argPtr.IsNull() {
			continue
		}
		cstrPtr := reg.ToCString(ctx, jsCtx, argPtr)
		if cstrPtr == 0 {
			continue
		}
		parts = append(parts, mem.ReadNullTerminatedString(hako.MemoryPtr(cstrPtr)))
		mem.FreeCString(jsCtx, cstrPtr)
	}
	return parts
}

func setupGlobalFunction(realm *hako.Realm, name string, funcID int32) error {
	ctx := context.Background()
	reg := realm.Runtime.Registry
	mem := realm.Runtime.Memory
	jsCtx := realm.Pointer

	namePtr, _ := mem.AllocateString(jsCtx, name)
	if namePtr == 0 {
		return fmt.Errorf("alloc function name failed")
	}
	defer mem.FreeMemory(jsCtx, namePtr)

	fnVal := reg.NewFunction(ctx, jsCtx, funcID, int32(namePtr))
	if fnVal.IsNull() {
		return fmt.Errorf("HAKO_NewFunction failed for %s", name)
	}
	defer mem.FreeValuePointer(jsCtx, fnVal)

	global := reg.GetGlobalObject(ctx, jsCtx)
	if global.IsNull() {
		return fmt.Errorf("HAKO_GetGlobalObject failed")
	}
	defer mem.FreeValuePointer(jsCtx, global)

	propNamePtr, _ := mem.AllocateString(jsCtx, name)
	if propNamePtr == 0 {
		return fmt.Errorf("alloc property name failed")
	}
	defer mem.FreeMemory(jsCtx, propNamePtr)

	propName := reg.NewString(ctx, jsCtx, int32(propNamePtr))
	if propName.IsNull() {
		return fmt.Errorf("HAKO_NewString failed")
	}
	defer mem.FreeValuePointer(jsCtx, propName)

	ret := reg.SetProp(ctx, jsCtx, global, propName, fnVal)
	if ret < 0 {
		return fmt.Errorf("HAKO_SetProp failed for %s", name)
	}

	return nil
}
