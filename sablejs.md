# sablejs

Closed-source bytecode-based sandboxed ES5 interpreter in JavaScript.

* Repository: https://github.com/sablejs/sablejs.git <img src="https://img.shields.io/github/stars/sablejs/sablejs?label=&style=flat-square" alt="GitHub stars" title="GitHub stars"><img src="https://img.shields.io/github/last-commit/sablejs/sablejs?label=&style=flat-square" alt="Last commit" title="Last commit">
* Language:   JavaScript
* License:    Custom
* Standard:   ES5
* Years:      2020-2022
* Parser:     Acorn
* Runtime:    stack-based VM

## Features

Fairly complete ES5 implementation, but **closed-source**:
* [sablejs-\<os\>-\<arch\>](https://github.com/sablejs/sablejs/releases/tag/v1.1.0):
  AOT bytecode compiler, ~40MiB Node-based binary
* [runtime.js](https://raw.githubusercontent.com/sablejs/sablejs/refs/heads/master/runtime.js):
  minified JavaScript blob with runtime VM, ~216K

Primary use case is JavaScript obfuscation. Developed for a captcha product.

Doesn't support `eval()`:
```sh
$ ./sablejs <(echo 'var x=""; eval(x)')
SyntaxError: dynamic expression isn't supported at eval and Function
```

Optimizations: constant-folding in compiler, function inlining/macro-expansions,
inline caching.

## Links

* https://www.infoq.cn/article/rdm3z4k0q8hkofsxshcm
