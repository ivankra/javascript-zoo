# castl

Self-hosting JavaScript to Lua compiler with a runtime library and eval().

* Repository: https://github.com/PaulBernier/castl.git <img src="https://img.shields.io/github/stars/PaulBernier/castl?label=&style=flat-square" alt="GitHub stars" title="GitHub stars"><img src="https://img.shields.io/github/last-commit/PaulBernier/castl?label=&style=flat-square" alt="Last commit" title="Last commit">
* LOC:        6366 (`cloc --not_match_d="(test|jscompile)" lua *.js`)
* Language:   Lua, JavaScript
* License:    LGPL-3.0-or-later
* Standard:   ES5
* Type:       compiler to Lua
* Years:      2014-2017
* Parser:     Esprima / Acorn
* JIT:        via LuaJIT
* Regex:      PCRE

## Features

* Targets unmodified Lua 5.2 / LuaJIT runtime, unlike [Tessel Colony](tessel-colony.md).
* Supports eval() through Lua-transpiled own code + Esprima parser.
* Some ES6 by optionally invoking babel during compilation.

## Bugs

Problems with large functions/modules due to 200 local variables limit on Lua's end.
