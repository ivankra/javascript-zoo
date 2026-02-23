# Microvium

Tiny interpreter for microcontrollers for a small JavaScript subset.

* Repository:  [coder-mike/microvium](https://github.com/coder-mike/microvium.git) <span class="shields"><img src="https://img.shields.io/github/stars/coder-mike/microvium?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/coder-mike/microvium?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [20608](# "cloc *.ts lib native-vm")
* Language:    C, TypeScript
* License:     MIT
* Years:       2020-2023
* Type:        JavaScript-like language ([supported features](https://github.com/coder-mike/microvium/blob/main/doc/supported-language.md))
* Interpreter: stack-based VM

## Notes

2-part system: AOT compiler written in TypeScript generates bytecode and there is a separate C-based runtime to execute it.

## Links

* https://news.ycombinator.com/item?id=31819728
