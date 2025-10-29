# Sobek

Grafana's fork of [goja](goja.md) engine.

* Repository:  https://github.com/grafana/sobek.git <span class="shields"><img src="https://img.shields.io/github/stars/grafana/sobek?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/grafana/sobek?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         46789 (`cloc --fullpath --not_match_f="(?i)(test)" --exclude-lang=Markdown,YAML .`)
* Language:    Go
* License:     MIT
* Ancestor:    [goja](goja.md)
* Standard:    ES6 (partial)
* Years:       2024-
* Interpreter: stack-based VM ([vm.go](https://github.com/grafana/sobek/blob/main/vm.go))
* Platform:    Go (cgo-free)
