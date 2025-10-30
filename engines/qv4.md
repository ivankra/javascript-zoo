# QV4 / QJSEngine

JavaScript engine of Qt's QML framework (QJSEngine).

* Homepage:     https://wiki.qt.io/V4
* Repository:   https://github.com/qt/qtdeclarative.git <span class="shields"><img src="https://img.shields.io/github/stars/qt/qtdeclarative?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/qt/qtdeclarative?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
  * Top-level repository - https://code.qt.io/qt/qt5.git
  * Engine code in [qtdeclarative/src/qml](https://github.com/qt/qtdeclarative/tree/dev/src/qml) + JSC's macroassembler and YARR in [qtdeclarative/src/3rdparty](https://github.com/qt/qtdeclarative/tree/dev/src/3rdparty)
* LOC:          50221 (`cloc qtdeclarative/src/{qml/{jsruntime,jsapi,jit}`)
* Language:     C++
* License:      Qt, GPL, LGPL
* Org:          Qt
* Standard:     ES2016
* Years:        2012-
* Predecessors: [QtScript](qtscript.md), [V8](v8.md)
* Interpreter:  register-based VM with accumulator ("Moth", [qv4vme_moth.cpp](https://github.com/qt/qtdeclarative/blob/dev/src/qml/jsruntime/qv4vme_moth.cpp))
* JIT:          x86/x64, arm/arm64
* Regex engine: YARR, JIT-enabled

## History

First appeared in Qt 5.0 (2012) as a V8 wrapper, then switched to a home-grown engine in Qt 5.3 (2013).

## Users

* Qt applications
* [KDE Plasma](https://develop.kde.org/docs/plasma/scripting/)
* [Okular](https://github.com/KDE/okular) - for evaluation of JavaScript code in .pdf
