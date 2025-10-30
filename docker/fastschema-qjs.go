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

func main() {
	flag.BoolVar(&strictMode, "strict", false, "enable strict mode execution")
	flag.Parse()

	args := flag.Args()
	if len(args) > 0 {
		scriptFile := args[0]
		if err := executeScript(scriptFile); err != nil {
			fmt.Fprintf(os.Stderr, "Error: %v\n", err)
			os.Exit(1)
		}
	} else {
		if err := runREPL(); err != nil {
			fmt.Fprintf(os.Stderr, "Error: %v\n", err)
			os.Exit(1)
		}
	}
}

func executeScript(filename string) error {
	content, err := os.ReadFile(filename)
	if err != nil {
		return fmt.Errorf("failed to read file %s: %w", filename, err)
	}

	rt, err := qjs.New()
	if err != nil {
		return fmt.Errorf("failed to create runtime: %w", err)
	}
	defer rt.Close()

	ctx := rt.Context()

	var result *qjs.Value
	if strictMode {
		result, err = ctx.Eval(filename, qjs.Code(string(content)), qjs.FlagStrict())
	} else {
		result, err = ctx.Eval(filename, qjs.Code(string(content)))
	}
	if err != nil {
		return fmt.Errorf("execution error: %w", err)
	}
	defer result.Free()

	if !result.IsUndefined() {
		fmt.Println(result.String())
	}

	return nil
}

func runREPL() error {
	rt, err := qjs.New()
	if err != nil {
		return fmt.Errorf("failed to create runtime: %w", err)
	}
	defer rt.Close()

	ctx := rt.Context()
	scanner := bufio.NewScanner(os.Stdin)
	lineNum := 0

	for {
		fmt.Print("qjs> ")
		if !scanner.Scan() {
			break
		}

		line := scanner.Text()
		line = strings.TrimSpace(line)

		if line == "" {
			continue
		}

		lineNum++
		filename := fmt.Sprintf("<stdin:%d>", lineNum)

		result, err := ctx.Eval(filename, qjs.Code(line))
		if strictMode {
			result, err = ctx.Eval(filename, qjs.Code(line), qjs.FlagStrict())
		}
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error: %v\n", err)
			continue
		}

		if !result.IsUndefined() {
			fmt.Println(result.String())
		}

		result.Free()
	}

	if err := scanner.Err(); err != nil {
		return fmt.Errorf("scanner error: %w", err)
	}

	return nil
}
