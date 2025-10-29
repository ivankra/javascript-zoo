// Basic REPL / script runner for sobek.
// Adapted from https://github.com/dop251/goja/blob/master/goja/main.go
//
// Copyright (c) 2025 Ivan Krasilnikov
// Copyright (c) 2016 Dmitry Panov
// Copyright (c) 2012 Robert Krimen
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
// WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

//go:build ignore
package main

import (
	crand "crypto/rand"
	"encoding/binary"
	"flag"
	"fmt"
	"io"
	"math/rand"
	"os"
	"runtime/debug"

	"github.com/grafana/sobek"
)

func readSource(filename string) ([]byte, error) {
	if filename == "" || filename == "-" {
		return io.ReadAll(os.Stdin)
	}
	return os.ReadFile(filename)
}

func load(vm *sobek.Runtime, call sobek.FunctionCall) sobek.Value {
	p := call.Argument(0).String()
	b, err := readSource(p)
	if err != nil {
		panic(vm.ToValue(fmt.Sprintf("Could not read %s: %v", p, err)))
	}
	v, err := vm.RunScript(p, string(b))
	if err != nil {
		panic(err)
	}
	return v
}

func newRandSource() sobek.RandSource {
	var seed int64
	if err := binary.Read(crand.Reader, binary.LittleEndian, &seed); err != nil {
		panic(fmt.Errorf("Could not read random bytes: %v", err))
	}
	return rand.New(rand.NewSource(seed)).Float64
}

func run() error {
	filename := flag.Arg(0)
	src, err := readSource(filename)
	if err != nil {
		return err
	}

	if filename == "" || filename == "-" {
		filename = "<stdin>"
	}

	vm := sobek.New()
	vm.SetRandSource(newRandSource())

	//new(require.Registry).Enable(vm)
	//console.Enable(vm)

	vm.Set("print", func(call sobek.FunctionCall) sobek.Value {
		for i, arg := range call.Arguments {
			if i > 0 {
				fmt.Print(" ")
			}
			fmt.Print(arg.String())
		}
		fmt.Println()
		return sobek.Undefined()
	})

	vm.Set("load", func(call sobek.FunctionCall) sobek.Value {
		return load(vm, call)
	})

	vm.Set("readFile", func(name string) (string, error) {
		b, err := os.ReadFile(name)
		if err != nil {
			return "", err
		}
		return string(b), nil
	})

	prg, err := sobek.Compile(filename, string(src), false)
	if err != nil {
		return err
	}
	_, err = vm.RunProgram(prg)
	return err
}

func main() {
	defer func() {
		if x := recover(); x != nil {
			debug.Stack()
			panic(x)
		}
	}()
	flag.Parse()

	if err := run(); err != nil {
		switch err := err.(type) {
		case *sobek.Exception:
			fmt.Println(err.String())
		case *sobek.InterruptedError:
			fmt.Println(err.String())
		default:
			fmt.Println(err)
		}
		os.Exit(64)
	}
}
