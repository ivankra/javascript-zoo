# DMDScript

ECMAScript implementation by Digital Mars written in D.

* Homepage:    https://www.digitalmars.com/dscript/
* Repository:  https://github.com/DigitalMars/DMDScript.git <span class="shields"><img src="https://img.shields.io/github/stars/DigitalMars/DMDScript?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/DigitalMars/DMDScript?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         18013 (`cloc engine`)
* Language:    D
* License:     BSL-1.0 (Boost Software License 1.0)
* Org:         Digital Mars
* Standard:    ES3 (partial)
* Years:       2002-
* Ancestor:    [DscriptCPP](dscriptcpp.md) (original C++ version)
* Interpreter: register-based VM ([opcodes.d](https://github.com/DigitalMars/DMDScript/blob/master/engine/source/dmdscript/opcodes.d))

## Shell

No console object.

Shell built-ins ([dglobal.d](https://github.com/DigitalMars/DMDScript/blob/master/engine/source/dmdscript/dglobal.d#L757), [dglobal.c](https://github.com/DigitalMars/DscriptCPP/blob/main/src/dscript/dglobal.c#L1147)):
  * `print(s)`: print value without newline
  * `println(s)`
  * `readln()`: "" on EOF
  * `getenv(s)`
  * `println([ScriptEngine(), ScriptEngineBuildVersion(), ScriptEngineMajorVersion(), ScriptEngineMinorVersion()])` -> `DMDScript,1,5,5`
