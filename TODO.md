* dist uid and permissions;  /zoo/dist in motd
* engines
  * Standard -> Specification / Target spec
* docker
  * dist.py script copy/mount at the end to simplify builds
    * allow publishing multiple artefacts per build
    * auto detect intrinsics needed for bench/conformance/test262.
      * `"instrinsics": {key: true/false/replacement snippet}`
      * `"$262": true`
      * `"console.log": true`
      * `"print": "console.log"` (print, println, console.log)
      * `"Date.now()": "(new Date()).getTime()"`
      * `performance.now: false`
      * putstr, read(line), eval, scriptArgs, ...
      * `docker/<engine>.262.js` / `conformance/runtimes/<engine>.js`
        * full $262 definitions for complex cases
        * https://github.com/test262-fyi/data/tree/main/engines
        * https://github.com/tc39/eshost/blob/master/runtimes/
    * `--dist_du="--exclude=*.pyc ..."`
    * `--license_glob="LICENSE.*,xxx"`
    * `--bash_wrapper="exec $SCRIPT_DIR/..."`
    * `--summary=...`
    * `--repl` / `--repl_cmd="$BINARY repl"`  => `"repl_cmd": "$BINARY ..."`
    * `--run_cmd="$BINARY eval ${MODULE:+--module} $FILE"`
      * FILE if accepts only one
      * FILES if many, sharing global namespace
      * MODULE=1 if run as module
       * `--run_timed_cmd="$BINARY --time $TIME $FILE"` (only time VM, exclude compilation)
    * `--version_cmd="$BINARY --version | grep ..."`, git describe --tags -> only at dist time
    * host runtime meta?
      * HOST: <engine>, node, java, luajit etc; `--host=node/luajit/...`
      * `--host_version_cmd="echo node $(node -v)"` -> metadata, or 
    * `--eshost=<host type>` jsvu esvu etc
    * conformance/run lib, shared between bench and conformance
  * make depend, split up make base rule
  * narcissus: vendor-in, add console.log() and multiple scripts command-line args
  * hako: go embed wasm module, update to new repo
  * wasm builds + try different wasm runtime wazero wasmtime etc
  * js-interpreter_jsc, nashorn_ot - do something
  * jscript via wine
  * CI
    * rebuild nightly and/or tag push
    * make sure all dockerfiles point to master/lkgr-like
    * update.py to gen github workflows
    * lightweight bench
    * profile builds - time/space, optimize
* /dist/runtimes
  * node, bun, deno symlinks
  * node_0.x - nvm install 0.x
  * cjs/gjs
* jszvu: esvu/jsvu equivalent
  * build from source on user's machine: docker, podman, buildah, macOS containerization
  * or fetch github build artifact
  * check builds from BASE=debian:stable and other releases
  * check compatibility of builds with non-debian distros; vs engines official builds
  * test running outside /dist, fix/document exceptions
  * fully static builds `*_static`
  * normal full-featured builds by default, `*_min` for size benchmarking
  * version handling
* update.py
  * checkout and update repos, update loc
* bench
  * timestamp_output to score
  * try various strategies to reduce variance
    * variance.py report
    * interleaving runs
    * pin container to specific cores, podman --cpuset-cpus, set governor performance; script
    * more repetitions for higher variance engines/test
    * hetzner dedicated vm
  * https://github.com/WebKit/JetStream
* parsers / transpilers
  * expand and add transpilers
  * test parsers on conformance test suite, report results
  * test minimalistic ES5 engine (mujs, duktape, node 0.x - nvm install 0, spidermonkey_1.8.5 etc) + transpilers on conformance test suite
* conformance
  * test262
  * align filenames with test262
  * ensure every test has ": (OK|failed|exception)", check for all to detect dumb echos
  * verify unexpected OKs
  * ES1: this/inheritance/hoisting tests
  * ESnext permalinks
  * default strict mode fixes, bun/deno
  * run.sh embed metadata in txt
  * run.sh parallelize / maybe rewrite in python
  * github.io conformance.html: compat-table's original + transposed layout, toggleable loadable details, opt for speed
