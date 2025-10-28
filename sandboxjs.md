# SandboxJS

Interpreter for a limited subset of ES6 for sandboxing untrusted code, preventing access to non-whitelisted functions/prototypes.

* Repository:       https://github.com/nyariv/SandboxJS.git <span class="shields"><img src="https://img.shields.io/github/stars/nyariv/SandboxJS?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/nyariv/SandboxJS?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              4212 (`cloc src`)
* Language:         TypeScript
* License:          MIT
* Standard:         ES6 (subset)
* Years:            2019-
* Runtime platform: JavaScript
* Interpreter:      tree walker

## Features

Parses code and runs it through own tree-walking runtime, preventing it from accessing
host engine's functions/prototypes outside of a user-specified whitelist.

Can't run any moderately complex code using classes/prototype-based inheritance -
those will just trip against the whitelist.
