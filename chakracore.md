# ChakraCore

JavaScript engine of Microsoft Edge Legacy.

* Repository: https://github.com/chakra-core/ChakraCore.git <img src="https://img.shields.io/github/stars/chakra-core/ChakraCore?label=&style=flat-square" alt="GitHub stars" title="GitHub stars"><img src="https://img.shields.io/github/last-commit/chakra-core/ChakraCore?label=&style=flat-square" alt="Last commit" title="Last commit">
* LOC:        779986 (`cloc --fullpath --not_match_f="(?i)(test)" lib pal`)
* Language:   C++
* License:    MIT
* Note:       Doesn't support Linux arm64.
* Org:        Microsoft
* Standard:   ES2019
* Years:      2015-2021
* Runtime:    register-based VM, deferred compilation
* JIT:        2-tier JIT
* DLL:        chakra.dll

## History

Originally kept the same name as the predecessor - IE9-11's [Jscript9](jscript9.md)/Chakra engine (jscript9.dll).
Sometimes called new Chakra engine, Chakra Edge or chakra.dll to distinguish from it.

Open-sourced in 2016 under the name ChakraCore (except for some parts like
COM/browser bindings that stay in the closed-source chakra.dll).

Microsoft discontinued maintenance of ChakraCore and stopped providing security patches
in March 2021 ([ref](https://github.com/chakra-core/ChakraCore/issues/6384)),
passed it to a rather inactive community of external maintainers.
Continued production use (esp. with JIT) is thus risky from security perspective.
Closed-source chakra.dll in Windows, presumably, is still maintained.

## Features

* ES2020
  * BigInt: implemented, but disabled by default
  * Optional chaining: not implemented

## Links

* https://www.microsoft.com/en-us/research/wp-content/uploads/2018/04/41159.compressed.pdf
* https://learn.microsoft.com/en-us/archive/microsoft-edge/legacy/developer/hosting/chakra-hosting/targeting-edge-vs-legacy-engines-in-jsrt-apis
