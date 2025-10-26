# QV4

JavaScript engine of Qt's QML framework (QJSEngine).

* Homepage:     https://wiki.qt.io/V4
* Repository:   https://github.com/qt/qtdeclarative.git <img src="https://img.shields.io/github/stars/qt/qtdeclarative?label=&style=flat-square" alt="GitHub stars" title="GitHub stars"><img src="https://img.shields.io/github/last-commit/qt/qtdeclarative?label=&style=flat-square" alt="Last commit" title="Last commit">
* LOC:          50221 (`cloc qtdeclarative/src/{qml/{jsruntime,jsapi,jit}`, +extra 50k in qtdeclarative/src/3rdparty - JSC's macroassembler and YARR)
* Language:     C++
* License:      Qt, GPL, LGPL
* Org:          Qt
* Standard:     ES2016
* Years:        2012-
* Interpreter:  register-based VM with accumulator ([qv4vme_moth.cpp](https://github.com/qt/qtdeclarative/blob/dev/src/qml/jsruntime/qv4vme_moth.cpp))
* JIT:          x86/x64, arm/arm64
* Regex engine: YARR, JIT-enabled

## History

First appeared in Qt 5.0 (2012) as a V8 wrapper, then switched to a home-grown engine in Qt 5.3 (2013).

## Components

* Top-level repository: https://code.qt.io/qt/qt5.git
* Engine code in [qtdeclarative/src/qml](https://github.com/qt/qtdeclarative/tree/dev/src/qml)

## Users

* Qt applications
* [KDE Plasma](https://develop.kde.org/docs/plasma/scripting/)
* [Okular](https://github.com/KDE/okular): for evaluation of JavaScript code in .pdf
