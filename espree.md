# Espree

[Esprima](esprima.md)-compatible parser from ESLint.
Currently just a thin layer on top of [Acorn](acorn.md) parser.

* Homepage:   https://github.com/eslint/js/blob/main/packages/espree/README.md
* NPM:        https://www.npmjs.com/package/espree
* Repository: https://github.com/eslint/js.git <span class="shields"><img src="https://img.shields.io/github/stars/eslint/js?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/eslint/js?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:        436 (`cloc packages/espree/lib`)
* Language:   JavaScript
* License:    BSD-2-Clause
* Standard:   ESnext
* Years:      2014-
* Type:       parser
* Features:   ESTree, JSX

## History

Started out as a fork of Esprima v1.2.2 (last pre-ES6 version),
out of frustration with its pace of development, lack of ES6/JSX support,
and breaking changes imposed by the alternatives.

With Espree 2.0.0 release, it's now built on top of [Acorn](acorn.md)
as a thin translation layer between Acorn and Esprima API.

> The primary goal is to produce the exact same AST structure and tokens as
> Esprima, and that takes precedence over anything else.

## Links

* https://eslint.org/blog/2014/12/espree-esprima/
