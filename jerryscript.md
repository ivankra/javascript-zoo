# JerryScript

Lightweight JavaScript engine for microcontrollers.

* Homepage:    https://jerryscript.net/
* Repository:  https://github.com/jerryscript-project/jerryscript.git <img src="https://img.shields.io/github/stars/jerryscript-project/jerryscript?label=&style=flat-square" alt="GitHub stars" title="GitHub stars"><img src="https://img.shields.io/github/last-commit/jerryscript-project/jerryscript?label=&style=flat-square" alt="Last commit" title="Last commit">
* LOC:         108762 (`cloc jerry-*`)
* Language:    C
* License:     Apache-2.0
* Org:         Samsung
* Standard:    ES2022 (partial, missing ES2018 regex and a few other features)
* Years:       2014-
* Interpreter: stack-based VM

## Bugs

Very slow memory manager/GC: Splay benchmark score <1 with extremely slow SplaySetup().

## Runtimes

* [IoT.js](https://github.com/jerryscript-project/iotjs)
* [Microlattice.js](https://github.com/iamblue/microlattice)
* [Kaluma](https://github.com/kaluma-project/kaluma)
