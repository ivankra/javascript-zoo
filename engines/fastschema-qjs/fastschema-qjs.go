// Basic REPL and script runner for fastschema/qjs.
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
	"strings"

	"github.com/fastschema/qjs"
)

var strictMode bool
var moduleMode bool

func evalAndPrint(ctx *qjs.Context, name, code string) {
	var result *qjs.Value
	var err error
	options := []qjs.EvalOptionFunc{qjs.Code(code)}
	if strictMode {
		options = append(options, qjs.FlagStrict())
	}
	if moduleMode {
		options = append(options, qjs.TypeModule())
	}

	result, err = ctx.Eval(name, options...)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Uncaught exception: %v\n", err)
		os.Exit(1)
	}
	defer result.Free()

	if !result.IsUndefined() {
		fmt.Println(result.String())
	}
}

func main() {
	flag.BoolVar(&strictMode, "strict", false, "enable strict mode execution")
	flag.BoolVar(&moduleMode, "module", false, "execute input as an ES module")
	flag.Parse()

	rt, err := qjs.New()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Failed to create runtime: %v\n", err)
		os.Exit(1)
	}
	defer rt.Close()

	ctx := rt.Context()

	if len(flag.Args()) > 0 {
		for _, filename := range flag.Args() {
			data, err := os.ReadFile(filename)
			if err != nil {
				fmt.Fprintf(os.Stderr, "Failed to read file %s: %v\n", filename, err)
				os.Exit(1)
			}

			evalAndPrint(ctx, filename, string(data))
		}
	} else {
		scanner := bufio.NewScanner(os.Stdin)
		for {
			fmt.Print("> ")
			if !scanner.Scan() {
				break
			}

			line := strings.TrimSpace(scanner.Text())
			if line == "" {
				continue
			}

			evalAndPrint(ctx, "<stdin>", line)
		}

		if err := scanner.Err(); err != nil {
			fmt.Fprintf(os.Stderr, "Error reading input: %v\n", err)
			os.Exit(1)
		}
	}
}
