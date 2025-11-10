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

func evalAndPrint(ctx *qjs.Context, name, code string) error {
	var result *qjs.Value
	var err error
	if strictMode {
		result, err = ctx.Eval(name, qjs.Code(code), qjs.FlagStrict())
	} else {
		result, err = ctx.Eval(name, qjs.Code(code))
	}
	if err != nil {
		return err
	}
	defer result.Free()

	if !result.IsUndefined() {
		fmt.Println(result.String())
	}
	return nil
}

func main() {
	flag.BoolVar(&strictMode, "strict", false, "enable strict mode execution")
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

			if err := evalAndPrint(ctx, filename, string(data)); err != nil {
				fmt.Fprintf(os.Stderr, "Error: %v\n", err)
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

			line := strings.TrimSpace(scanner.Text())
			if line == "" {
				continue
			}

			if err := evalAndPrint(ctx, "<stdin>", line); err != nil {
				fmt.Fprintf(os.Stderr, "Error: %v\n", err)
			}
		}

		if err := scanner.Err(); err != nil {
			fmt.Fprintf(os.Stderr, "Error reading input: %v\n", err)
			os.Exit(1)
		}
	}
}
