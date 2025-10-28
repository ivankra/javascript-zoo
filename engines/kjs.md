# KJS

Original JavaScript engine of KDE's Konqueror browser.

* Homepage:     https://invent.kde.org/frameworks/kjs
* Repository:   https://github.com/KDE/kjs.git <span class="shields"><img src="https://img.shields.io/github/stars/KDE/kjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/KDE/kjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          42352 (`cloc src`)
* Language:     C++
* License:      LGPL-2.1-only (most source files are LGPL 2.0+)
* Org:          KDE
* Standard:     ES5
* Years:        1998-2023
* Interpreter:  tree walker, register-based VM (2008)
* Regex engine: PCRE2

## History

* 2001: KHTML/KJS forked by Apple as WebCore/[JavaScriptCore](jsc.md) for their WebKit browser engine.
* 2008: implemented a bytecode interpreter "FrostByte" (https://blogs.kde.org/2008/05/22/news-land-konquerors/)
* Most dead by KDE 5 (2014)
* Dropped from KDE 6 (2024)
