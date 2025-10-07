# JScript9 / Chakra

JavaScript engine of Internet Explorer 9.0 – 11.0.

* Language:   C++
* License:    Proprietary
* Org:        Microsoft
* Standard:   ES6 (partial)
* Years:      2009-2013
* JIT:        yes
* DLL:        jscript9.dll, jscript9Legacy.dll

## History

Succeeded by a newer engine in Microsoft Edge (Legacy) - which originally also kept Chakra name (chakra.dll),
later open-sourced as [ChakraCore](chakracore.md).

Still used in Windows as `jscript9Legacy.dll` - Windows 11 24H2's drop-in replacement of
classic [JScript](jscript.md) with a Chakra-based engine.

## Links

* [MS-ES6](https://learn.microsoft.com/en-us/openspecs/ie_standards/ms-es6/2262a105-d776-4a44-9d2a-f11bb039b4c5): ES6 compliance documentation
* https://www.microsoft.com/en-us/research/wp-content/uploads/2018/04/41159.compressed.pdf
* https://www.usenix.org/legacy/event/webapps10/tech/full_papers/Ratanaworabhan.pdf
* https://learn.microsoft.com/en-us/archive/microsoft-edge/legacy/developer/hosting/chakra-hosting/targeting-edge-vs-legacy-engines-in-jsrt-apis
