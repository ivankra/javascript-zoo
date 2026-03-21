# JavaScript engines zoo

Contents:
  * [engines](engines/README.md): list of JavaScript engines
  * [parsers](parsers/README.md): list of JavaScript parsers
  * [app](app/): SPA app for [zoo.js.org](https://zoo.js.org/)
  * [bench](bench/): benchmarking different engines on V8's test suite
  * [build](build/README.md): docker/make-based build system for open-source engines (base build scripts and containers)
  * [harness](harness/): testing harness for test262/benchmarking
  * [conformance](conformance/README.md): ECMAScript conformance test suites

See [zoo.js.org](https://zoo.js.org/) for the main tabular view with benchmark and conformance scores,
or perhaps [engines.json](https://zoo.js.org/engines.json) for a machine-readable json with structured data.

Most engines come with a build script. Build and play around with any engine locally (needs `docker`, `podman` or Apple's 
<code>[container](https://github.com/apple/container/releases)</code>):
  * `cd engines/<name>/ && make`
  * `cd engines/<name>/ && make sh` - explore the build container (build artifacts will be in `/dist`)
  * `DOCKER_ARCH=riscv64 make sh` - cross build with qemu (`sudo apt install qemu-user-static`)
  * `REPO=https://... REV=<commit/branch/tag> make` - build from a specific commit and/or repo

You can download pre-built binaries from [GitHub releases](https://github.com/ivankra/javascript-zoo/releases) or play with them using this [Docker Hub](https://hub.docker.com/r/ivankra/javascript-zoo) image:
  * `docker run -it ivankra/javascript-zoo`
  * `podman run -it docker.io/ivankra/javascript-zoo`
  * `container run -it docker.io/ivankra/javascript-zoo`

## Links

* Allen Wirfs-Brock and Brendan Eich (2020). [JavaScript: the first 20 years](https://dl.acm.org/doi/pdf/10.1145/3386327).
* Other JavaScript engines compendiums: [wikipedia](https://en.wikipedia.org/wiki/List_of_JavaScript_engines), [bkil](https://github.com/bkil/gemiweb0/tree/master/doc/javascript-interpreter-runtimes.md), [linusg](https://github.com/linusg/ecmascript-wiki), [ahaoboy](https://github.com/ahaoboy/js-engine-benchmark), [eatonphil.com](https://notes.eatonphil.com/javascript-implementations.html), [buttondown.com](https://buttondown.com/whatever_jamie/archive/the-many-many-many-javascript-runtimes-of-the-last-decade/), [guest271314](https://gist.github.com/guest271314/bd292fc33e1b30dede0643a283fadc6a), [bga](https://bga.github.io/list-of-ecmascript-engines/), [JsUnit](https://joehni.github.io/JsUnit/products.html) (early 2000s JavaScript landscape), [thaliaarchi](https://github.com/thaliaarchi/regexp-museum/tree/master/langs/javascript.md) (regex engines)
* [esvu](https://github.com/devsnek/esvu) / [jsvu](https://github.com/GoogleChromeLabs/jsvu) - installers for official releases of various engines
* [test262.fyi](https://test262.fyi/) - daily test262 runs for recent engines
