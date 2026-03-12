// Basic REPL and script runner for modernc.org/quickjs.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

//go:build ignore

package main

import (
	"bufio"
	"flag"
	"fmt"
	"os"

	"modernc.org/quickjs"
)

func main() {
	moduleMode := flag.Bool("module", false, "execute input files as ES modules")
	flag.Parse()

	vm, err := quickjs.NewVM()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Failed to create VM: %v\n", err)
		os.Exit(1)
	}
	defer vm.Close()

	vm.StdAddHelpers() // print, console.log bindings

	evalFlags := quickjs.EvalGlobal
	if *moduleMode {
		vm.SetDefaultModuleLoader()
		evalFlags = quickjs.EvalModule
	}

	if flag.NArg() > 0 {
		for _, filename := range flag.Args() {
			data, err := os.ReadFile(filename)
			if err != nil {
				fmt.Fprintf(os.Stderr, "Failed to read file %s: %v\n", filename, err)
				os.Exit(1)
			}

			_, err = vm.Eval(string(data), evalFlags)
			if err != nil {
				fmt.Fprintf(os.Stderr, "Uncaught exception: %v\n", err)
				os.Exit(1)
			}
		}
	} else {
		scanner := bufio.NewScanner(os.Stdin)
		for {
			fmt.Print("> ")
			if !scanner.Scan() {
				break
			}

			result, err := vm.Eval(scanner.Text(), quickjs.EvalGlobal)
			if err != nil {
				fmt.Fprintf(os.Stderr, "Uncaught exception: %v\n", err)
			} else if _, isUndefined := result.(quickjs.Undefined); !isUndefined {
				fmt.Println(result)
			}
		}

		if err := scanner.Err(); err != nil {
			fmt.Fprintf(os.Stderr, "Error reading input: %v\n", err)
			os.Exit(1)
		}
	}
}
