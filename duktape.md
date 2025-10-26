# Duktape

Embeddable Javascript engine with a focus on portability and compact footprint.

* Repository:  https://github.com/svaarala/duktape.git <img src="https://img.shields.io/github/stars/svaarala/duktape?label=&style=flat-square" alt="GitHub stars" title="GitHub stars"><img src="https://img.shields.io/github/last-commit/svaarala/duktape?label=&style=flat-square" alt="Last commit" title="Last commit">
* LOC:         72815 (`cloc --exclude-ext=txt src-input`)
* Language:    C
* License:     MIT
* Standard:    ES2016 (partial)
* Years:       2013-
* Interpreter: register-based VM

## Users

* [NetSurf](https://github.com/netsurf-browser/netsurf/tree/master/content/handlers/javascript) browser
* [Zabbix](https://github.com/zabbix/zabbix/tree/master/src/libs/zbxembed/)
* [wasm-jseval](https://github.com/maple3142/wasm-jseval): safe eval library based on WebAssembly and Duktape/QuickJS

## Runtimes

* [dukluv](https://github.com/creationix/dukluv): libuv bindings for duktape
* [lowjs](https://github.com/neonious/lowjs): low-footprint Node.js port for duktape
