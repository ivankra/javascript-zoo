# DscriptCPP

[DMDScript](dmdscript.md) version implemented in C++.

* Homepage:         https://www.digitalmars.com/dscript/cppscript.html
* Repository:       https://github.com/DigitalMars/DscriptCPP.git <span class="shields"><img src="https://img.shields.io/github/stars/DigitalMars/DscriptCPP?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/DigitalMars/DscriptCPP?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              43988 (`cloc src`)
* Language:         C++
* License:          BSL-1.0
* Org:              Digital Mars
* Standard:         ES3 (partial)
* Years:            2000
* Runtime platform: native (Win32/Linux i386)
* Interpreter:      register-based VM ([opcodes.c](https://github.com/DigitalMars/DscriptCPP/blob/main/src/dscript/opcodes.c))

## Bugs

* Hacky non-portable x86-only C++ implementation: gccbitops.h, Gcx::fullcollectshell(), GC wants to scan stack, vtable hack.
* Can't parse object literals with quoted keys: `{"a": ...}`.

## Links

* https://news.ycombinator.com/item?id=45509636
