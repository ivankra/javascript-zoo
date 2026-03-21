// REPL and script runner with test262 support for Goja.
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

package main

import (
	"bufio"
	crand "crypto/rand"
	"encoding/binary"
	"flag"
	"fmt"
	"io"
	"log"
	"math/rand"
	"os"
	"runtime"
	"runtime/debug"
	"runtime/pprof"
	"strings"
	"time"

	"github.com/dop251/goja"
	"github.com/dop251/goja_nodejs/console"
	"github.com/dop251/goja_nodejs/require"
)

var cpuprofile = flag.String("cpuprofile", "", "write cpu profile to file")
var timelimit = flag.Int("timelimit", 0, "max time to run (in seconds)")

func readSource(filename string) ([]byte, error) {
	if filename == "" || filename == "-" {
		return io.ReadAll(os.Stdin)
	}
	return os.ReadFile(filename)
}

func load(vm *goja.Runtime, call goja.FunctionCall) goja.Value {
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

func newRandSource() goja.RandSource {
	var seed int64
	if err := binary.Read(crand.Reader, binary.LittleEndian, &seed); err != nil {
		panic(fmt.Errorf("Could not read random bytes: %v", err))
	}
	return rand.New(rand.NewSource(seed)).Float64
}

func run() error {
	vm := goja.New()
	vm.SetRandSource(newRandSource())

	printFunc := func(call goja.FunctionCall) goja.Value {
		for i, arg := range call.Arguments {
			if i > 0 {
				fmt.Print(" ")
			}
			fmt.Print(arg.String())
		}
		fmt.Println()
		return goja.Undefined()
	}

	vm.Set("print", printFunc)
	vm.Set("$262", create262(vm))

	new(require.Registry).Enable(vm)
	console.Enable(vm)

	vm.Set("load", func(call goja.FunctionCall) goja.Value {
		return load(vm, call)
	})

	vm.Set("readFile", func(name string) (string, error) {
		b, err := os.ReadFile(name)
		if err != nil {
			return "", err
		}
		return string(b), nil
	})

	if *timelimit > 0 {
		time.AfterFunc(time.Duration(*timelimit)*time.Second, func() {
			vm.Interrupt("timeout")
		})
	}

	if flag.NArg() > 0 {
		for i := 0; i < flag.NArg(); i++ {
			filename := flag.Arg(i)
			src, err := readSource(filename)
			if err != nil {
				return err
			}

			if filename == "" || filename == "-" {
				filename = "<stdin>"
			}

			prg, err := goja.Compile(filename, string(src), false)
			if err != nil {
				return err
			}
			_, err = vm.RunProgram(prg)
			if err != nil {
				return err
			}
		}
	} else {
		return runREPL(vm)
	}
	return nil
}

func runREPL(vm *goja.Runtime) error {
	scanner := bufio.NewScanner(os.Stdin)
	for {
		fmt.Print("> ")
		if !scanner.Scan() {
			break
		}

		val, err := vm.RunString(scanner.Text())
		if err != nil {
			fmt.Fprintln(os.Stderr, formatError(err))
		} else if val != nil && !goja.IsUndefined(val) {
			fmt.Println(val.String())
		}
	}
	return scanner.Err()
}

func formatError(err error) string {
	switch err := err.(type) {
	case *goja.Exception:
		return "Uncaught exception: " + strings.TrimRight(err.String(), "\n")
	case *goja.InterruptedError:
		return "Uncaught exception: " + strings.TrimRight(err.String(), "\n")
	default:
		return err.Error()
	}
}

// Creates a $262 object. Not implemented:
//   - createRealm: objects cannot cross runtime boundaries (see runtime.go)
//   - agent: SharedArrayBuffer/Atomics not implemented
//   - IsHTMLDDA: requires [[IsHTMLDDA]] internal slot, not supported by the engine
//   - AbstractModuleSource: source phase imports proposal not implemented
func create262(vm *goja.Runtime) *goja.Object {
	o := vm.NewObject()
	o.Set("global", vm.GlobalObject())
	o.Set("evalScript", func(call goja.FunctionCall) goja.Value {
		result, err := vm.RunString(call.Argument(0).String())
		if err != nil {
			panic(err)
		}
		return result
	})
	o.Set("detachArrayBuffer", func(call goja.FunctionCall) goja.Value {
		if obj, ok := call.Argument(0).(*goja.Object); ok {
			if ab, ok := obj.Export().(goja.ArrayBuffer); ok {
				ab.Detach()
				return goja.Undefined()
			}
		}
		panic(vm.NewTypeError("detachArrayBuffer() is called with incompatible argument"))
	})
	o.Set("gc", func() { runtime.GC() })
	return o
}

func main() {
	defer func() {
		if x := recover(); x != nil {
			debug.Stack()
			panic(x)
		}
	}()
	flag.Parse()
	if *cpuprofile != "" {
		f, err := os.Create(*cpuprofile)
		if err != nil {
			log.Fatal(err)
		}
		pprof.StartCPUProfile(f)
		defer pprof.StopCPUProfile()
	}

	if err := run(); err != nil {
		fmt.Fprintln(os.Stderr, formatError(err))
		os.Exit(64)
	}
}
