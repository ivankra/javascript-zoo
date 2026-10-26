# Boomkat

Embeddable JavaScript and TypeScript engine written in C3.

* Repository:  [ricardobeat/boomkat](https://github.com/ricardobeat/boomkat.git) <span class="shields"><img src="https://img.shields.io/github/stars/ricardobeat/boomkat?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/ricardobeat/boomkat?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* Language:    C3
* License:     BUSL-1.1
* Standard:    ESnext (partial)
* Years:       2026-
* Features:    TypeScript type stripping, modules, hidden classes
* Parser:      recursive descent, AST to bytecode
* Interpreter: register-based VM with direct-threaded dispatch
* GC:          incremental generational mark-and-sweep, reference-counted strings

## Builds

Requires Docker or Podman; the build installs C3 0.8.4 from source against LLVM 19
on amd64 and arm64. Both variants use upstream's checked-in O2/small settings.

* `boomkat`: default feature set, without Intl and Temporal.
* `boomkat_full_icu`: bundled Intl data, Collator and Temporal.

```sh
make -C engines/boomkat
```

Modules are the CLI default. The harness adds `--script` for classic scripts and
benchmarks and omits it for module tests.

## Links

* [Release binaries](https://github.com/ricardobeat/boomkat/releases)
* [Architecture](https://github.com/ricardobeat/boomkat/blob/main/docs/architecture.md)
* [Engine scope and limitations](https://github.com/ricardobeat/boomkat/blob/main/docs/engine-scope.md)

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>Tested revision: <a href="https://github.com/ricardobeat/boomkat/commit/4f08dac14a15f216f600a7db12ecbd62eec75787">4f08dac1</a> (Linux arm64, <code>boomkat</code>)</li>
<li>ES1: 100% (198/198)</li>
<li>ES3: 100% (148/148)</li>
<li>ES5: 100% (74/74)</li>
</ul></details>
