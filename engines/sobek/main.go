// REPL and script runner with test262 support for Sobek.
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
	"bufio"
	crand "crypto/rand"
	"encoding/binary"
	"flag"
	"fmt"
	"io"
	"log"
	"math/rand"
	"os"
	"path/filepath"
	"runtime"
	"runtime/debug"
	"runtime/pprof"
	"strings"
	"sync"
	"time"

	"github.com/grafana/sobek"
)

var cpuprofile = flag.String("cpuprofile", "", "write cpu profile to file")
var timelimit = flag.Int("timelimit", 0, "max time to run (in seconds)")
var moduleMode = flag.Bool("module", false, "execute input files as ECMAScript modules (implied for .mjs)")

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
	vm := sobek.New()
	vm.SetRandSource(newRandSource())
	loader := newModuleLoader()

	printFunc := func(call sobek.FunctionCall) sobek.Value {
		for i, arg := range call.Arguments {
			if i > 0 {
				fmt.Print(" ")
			}
			fmt.Print(arg.String())
		}
		fmt.Println()
		return sobek.Undefined()
	}

	vm.Set("print", printFunc)
	vm.Set("$262", create262(vm))

	// Setting up console with goja_nodejs:
	//new(require.Registry).Enable(vm)
	//console.Enable(vm)

	console := vm.NewObject()
	console.Set("log", printFunc)
	vm.Set("console", console)

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

			if *moduleMode || strings.HasSuffix(filename, ".mjs") {
				if err := loader.run(vm, filename, src); err != nil {
					return err
				}
			} else {
				prg, err := sobek.Compile(filename, string(src), false)
				if err != nil {
					return err
				}
				_, err = vm.RunProgram(prg)
				if err != nil {
					return err
				}
			}
		}
	} else {
		return runREPL(vm)
	}
	return nil
}

func runREPL(vm *sobek.Runtime) error {
	scanner := bufio.NewScanner(os.Stdin)
	for {
		fmt.Print("> ")
		if !scanner.Scan() {
			break
		}

		val, err := vm.RunString(scanner.Text())
		if err != nil {
			fmt.Fprintln(os.Stderr, formatError(err))
		} else if val != nil && !sobek.IsUndefined(val) {
			fmt.Println(val.String())
		}
	}
	return scanner.Err()
}

func formatError(err error) string {
	switch err := err.(type) {
	case *sobek.Exception:
		return "Uncaught exception: " + strings.TrimRight(err.String(), "\n")
	case *sobek.InterruptedError:
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
func create262(vm *sobek.Runtime) *sobek.Object {
	o := vm.NewObject()
	o.Set("global", vm.GlobalObject())
	o.Set("evalScript", func(call sobek.FunctionCall) sobek.Value {
		result, err := vm.RunString(call.Argument(0).String())
		if err != nil {
			panic(err)
		}
		return result
	})
	o.Set("detachArrayBuffer", func(call sobek.FunctionCall) sobek.Value {
		if obj, ok := call.Argument(0).(*sobek.Object); ok {
			if ab, ok := obj.Export().(sobek.ArrayBuffer); ok {
				ab.Detach()
				return sobek.Undefined()
			}
		}
		panic(vm.NewTypeError("detachArrayBuffer() is called with incompatible argument"))
	})
	o.Set("gc", func() { runtime.GC() })
	return o
}

// Note: module support is a Sobek feature. Goja doesn't implement ES modules.

type moduleLoader struct {
	mu    sync.Mutex
	files map[string]sobek.ModuleRecord
	paths map[sobek.ModuleRecord]string
}

func newModuleLoader() *moduleLoader {
	return &moduleLoader{
		files: make(map[string]sobek.ModuleRecord),
		paths: make(map[sobek.ModuleRecord]string),
	}
}

func canonicalFilename(filename string) string {
	if filename == "" || filename == "-" {
		return "<stdin>"
	}
	if abs, err := filepath.Abs(filename); err == nil {
		return abs
	}
	return filename
}

func resolveModulePath(referrer, specifier string) (string, error) {
	if specifier == "" {
		return "", fmt.Errorf("empty module specifier")
	}
	if filepath.IsAbs(specifier) {
		return filepath.Clean(specifier), nil
	}

	baseDir := "."
	if referrer != "" && referrer != "<stdin>" {
		baseDir = filepath.Dir(referrer)
	}
	return filepath.Clean(filepath.Join(baseDir, specifier)), nil
}

func (l *moduleLoader) resolve(referencingScriptOrModule interface{}, specifier string) (sobek.ModuleRecord, error) {
	var referrer string
	if module, ok := referencingScriptOrModule.(sobek.ModuleRecord); ok && module != nil {
		l.mu.Lock()
		referrer = l.paths[module]
		l.mu.Unlock()
	}

	path, err := resolveModulePath(referrer, specifier)
	if err != nil {
		return nil, err
	}

	l.mu.Lock()
	if module := l.files[path]; module != nil {
		l.mu.Unlock()
		return module, nil
	}
	l.mu.Unlock()

	src, err := readSource(path)
	if err != nil {
		return nil, err
	}

	module, err := sobek.ParseModule(path, string(src), l.resolve)
	if err != nil {
		return nil, err
	}

	l.mu.Lock()
	l.files[path] = module
	l.paths[module] = path
	l.mu.Unlock()
	return module, nil
}

func (l *moduleLoader) run(vm *sobek.Runtime, filename string, src []byte) error {
	name := canonicalFilename(filename)

	module, err := sobek.ParseModule(name, string(src), l.resolve)
	if err != nil {
		return err
	}

	l.mu.Lock()
	l.files[name] = module
	l.paths[module] = name
	l.mu.Unlock()

	if err := module.Link(); err != nil {
		return err
	}

	vm.SetImportModuleDynamically(func(referencingScriptOrModule interface{}, specifierValue sobek.Value, promiseCapability interface{}) {
		module, err := l.resolve(referencingScriptOrModule, specifierValue.String())
		vm.FinishLoadingImportModule(referencingScriptOrModule, specifierValue, promiseCapability, module, err)
		_, _ = vm.RunString("")
	})

	promise := module.Evaluate(vm)
	switch promise.State() {
	case sobek.PromiseStateRejected:
		if err, ok := promise.Result().Export().(error); ok {
			return err
		}
		return fmt.Errorf("%v", promise.Result())
	case sobek.PromiseStatePending:
		return fmt.Errorf("module evaluation is still pending")
	default:
		return nil
	}
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
