# Acorn

Dominant parser in JavaScript tooling ecosystem.

* URL:        https://www.npmjs.com/package/acorn
* Repository: https://github.com/acornjs/acorn.git <img src="https://img.shields.io/github/stars/acornjs/acorn?label=&style=flat-square" alt="GitHub stars" title="GitHub stars"><img src="https://img.shields.io/github/last-commit/acornjs/acorn?label=&style=flat-square" alt="Last commit" title="Last commit">
* LOC:        5548 (`cloc acorn/src`)
* Language:   JavaScript
* License:    MIT
* Standard:   ESnext
* Type:       parser
* Years:      2012-
* Features:   ESTree, JSX, plugins

## Features

* [ESTree](https://github.com/estree/estree) syntax tree output
* Extensible with a plugin system
* JSX support via official [acorn-jsx](https://github.com/acornjs/acorn-jsx) plugin
* Error-tolerant parser variant: [acorn-loose](https://github.com/acornjs/acorn/tree/master/acorn-loose)

## History

Originally written by Marijn Haverbeke (Eloquent JavaScript, CodeMirror), first released in 2012.

## Users

* [Espree](espree.md): ESLint's [Esprima](esprima.md)-compatible parser, now a wrapper on top of Acorn
* Engines:

<!-- update.py: format_table([r for r in data if 'acorn' in r.get('parser', '').lower()], columns={'Engine': 'engine_link', 'Language': 'language_abbr', 'Description': 'summary', 'Years': 'years', 'License': 'license_abbr'}) -->
| Engine | Language | Description | Years | License |
|---|---|---|---|---|
| [Porffor](porffor.md)<br>[<img src="https://img.shields.io/github/stars/CanadaHonk/porffor?label=&style=flat-square" alt="GitHub stars" title="GitHub stars"><img src="https://img.shields.io/github/last-commit/CanadaHonk/porffor?label=&style=flat-square" alt="Last commit" title="Last commit">](https://github.com/CanadaHonk/porffor) | JavaScript | Optimizing AOT compiler for JavaScript/TypeScript targetting WebAssembly and native binaries. | 2023- | MIT |
| [JS-Interpreter](js-interpreter.md)<br>[<img src="https://img.shields.io/github/stars/NeilFraser/JS-Interpreter?label=&style=flat-square" alt="GitHub stars" title="GitHub stars"><img src="https://img.shields.io/github/last-commit/NeilFraser/JS-Interpreter?label=&style=flat-square" alt="Last commit" title="Last commit">](https://github.com/NeilFraser/JS-Interpreter) | JavaScript | Sandboxed ES5 interpreter in JavaScript. | 2013- | Apache-2.0 |
| [bramblex/jsjs](bramblex-jsjs.md)<br>[<img src="https://img.shields.io/github/stars/bramblex/jsjs?label=&style=flat-square" alt="GitHub stars" title="GitHub stars"><img src="https://img.shields.io/github/last-commit/bramblex/jsjs?label=&style=flat-square" alt="Last commit" title="Last commit">](https://github.com/bramblex/jsjs) | TypeScript | Toy metacircular JavaScript interpreter. | 2018 |  |
| [sablejs](sablejs.md)<br>[<img src="https://img.shields.io/github/stars/sablejs/sablejs?label=&style=flat-square" alt="GitHub stars" title="GitHub stars"><img src="https://img.shields.io/github/last-commit/sablejs/sablejs?label=&style=flat-square" alt="Last commit" title="Last commit">](https://github.com/sablejs/sablejs) | JavaScript | Closed-source bytecode-based sandboxed ES5 interpreter in JavaScript. | 2020-2022 | Custom |
| [eval5](eval5.md)<br>[<img src="https://img.shields.io/github/stars/bplok20010/eval5?label=&style=flat-square" alt="GitHub stars" title="GitHub stars"><img src="https://img.shields.io/github/last-commit/bplok20010/eval5?label=&style=flat-square" alt="Last commit" title="Last commit">](https://github.com/bplok20010/eval5) | TypeScript | ES5 interpreter written in TypeScript. | 2019- | MIT |
| [sval](sval.md)<br>[<img src="https://img.shields.io/github/stars/Siubaak/sval?label=&style=flat-square" alt="GitHub stars" title="GitHub stars"><img src="https://img.shields.io/github/last-commit/Siubaak/sval?label=&style=flat-square" alt="Last commit" title="Last commit">](https://github.com/Siubaak/sval) | TypeScript | Metacircular JavaScript interpreter. | 2018- | MIT |
| [jscomp](jscomp.md)<br>[<img src="https://img.shields.io/github/stars/tmikov/jscomp?label=&style=flat-square" alt="GitHub stars" title="GitHub stars"><img src="https://img.shields.io/github/last-commit/tmikov/jscomp?label=&style=flat-square" alt="Last commit" title="Last commit">](https://github.com/tmikov/jscomp) | TypeScript | AOT compiler targetting native code via C++. | 2015-2016 | Apache-2.0 |
| [Tessel Colony](tessel-colony.md)<br>[<img src="https://img.shields.io/github/stars/tessel/colony-compiler?label=&style=flat-square" alt="GitHub stars" title="GitHub stars"><img src="https://img.shields.io/github/last-commit/tessel/colony-compiler?label=&style=flat-square" alt="Last commit" title="Last commit">](https://github.com/tessel/colony-compiler) | JavaScript | JavaScript to Lua compiler. | 2013-2015 | Apache/MIT |
| [castl](castl.md)<br>[<img src="https://img.shields.io/github/stars/PaulBernier/castl?label=&style=flat-square" alt="GitHub stars" title="GitHub stars"><img src="https://img.shields.io/github/last-commit/PaulBernier/castl?label=&style=flat-square" alt="Last commit" title="Last commit">](https://github.com/PaulBernier/castl) | Lua | Self-hosting JavaScript to Lua compiler with a runtime library and eval(). | 2014-2017 | LGPL-3.0+ |
<!-- end of generated table (9 rows) -->

## Links

* https://marijnhaverbeke.nl/blog/acorn.html
