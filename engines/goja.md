# goja

JavaScript engine in pure Go. Fully ES5 compliant, partially ES6+.

* Repository:       https://github.com/dop251/goja.git <span class="shields"><img src="https://img.shields.io/github/stars/dop251/goja?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/dop251/goja?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              46141 (`cloc --fullpath --not_match_f="(?i)(test)" --exclude-lang=Markdown,YAML .`)
* Language:         Go
* License:          MIT
* Standard:         ES6 (partial)
* Years:            2016-
* Ancestor:         [otto](otto.md) (borrowed otto's parser)
* Forks:            [Sobek](sobek.md)
* Parser:           recursive descent ([parser/](https://github.com/dop251/goja/tree/master/parser/), LOC: 4.3k)
* Runtime platform: Go (cgo-free)
* Interpreter:      stack-based VM

## Users

* [Geth](https://github.com/ethereum/go-ethereum) - Ethereum's Go implementation
