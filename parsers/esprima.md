# Esprima

First widely-used JavaScript parser written in JavaScript.
Not actively developed since ~2018.

* Homepage:   https://esprima.org/
* Repository: https://github.com/jquery/esprima.git <span class="shields"><img src="https://img.shields.io/github/stars/jquery/esprima?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/jquery/esprima?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:        6705 (`cloc src`)
* Language:   TypeScript
* License:    BSD-2-Clause
* Standard:   ES2019
* Years:      2011-2021
* Features:   ESTree, JSX

## History

Created by Ariya Hidayat, released in December 2011.

Based its original AST format on SpiderMonkey AST, a JSON-based format
from Mozilla's earlier experimental `Reflect.parse()`
([Parser API](https://web.archive.org/web/20201029234034/https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API)).
Esprima/SpiderMonkey AST became de facto AST standard at the time,
widely adopted in tooling.

AST format was later formalized and expanded as [ESTree](https://github.com/estree/estree)
specification (~2015), with participation of Mozilla, Esprima, Acorn, Babel,
ESLint and others, enabling parser interoperability across JavaScript ecosystem.

Development stagnated after 2017, with the final official release 4.0.1 in 2018.
Mostly only used in legacy tools now, while the ecosystem has largely moved on
to [Acorn](acorn.md) and its derivatives. [Espree](espree.md) is a modern
drop-in alternative to Esprima, now built as a transition layer on top of Acorn
with the goal of producing output that is similar to Esprima with a similar API.

## Users

* [ESLint](https://eslint.org/): static code analysis tool.
  Originally used Esprima, later switched to its own [Espree](espree.md) parser.
* [Continuum](../engines/continuum.md) engine (2012-2014)

## Links

* https://ariya.io/2011/12/introducing-esprima
