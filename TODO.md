* dist uid and permissions;  /zoo/dist in motd
* contributors statistic
* update code

* engines
  * Standard -> Specification / Target spec
* docker
  * dist.py script copy/mount at the end to simplify builds
    * allow publishing multiple artefacts per build
    * function testing / intrinsics
      * `"$262": true`
      * `"console.log": true`
      * `"print": "console.log"` (print, println, console.log)
      * `"Date.now()": "(new Date()).getTime()"`
      * `performance.now: false`
      * putstr, read(line), eval, scriptArgs, ...
    * `--dist_du="--exclude=*.pyc ..."`
    * `--license_glob="LICENSE.*,xxx"`
    * `--bash_wrapper="exec $SCRIPT_DIR/..."`
    * `--summary=...`
    * `--repl` / `--repl_cmd="$BINARY repl"`  => `"repl_cmd": "$BINARY ..."`
    * `--run_cmd="$BINARY eval $FILE"` (accepts only one)
      * `--run_files_cmd="$BINARY -- $FILES"` (accepts multiple, sharing namespace)
    * `--run_timed_cmd="$BINARY --time $TIME $FILE"` (only time VM, exclude compilation)
    * `--version_cmd="$BINARY --version | grep ..."`
    * `--platform_version_cmd="echo node $(node -v)"`
    * conformance/run lib, shared between bench and conformance
  * hub.Dockerfile; git clone ... /zoo; /dist -> zoo/dist/...
  * narcissus: vendor-in, add console.log() and multiple scripts command-line args
  * hako: go embed wasm module, update to new repo
  * wasm builds + try different wasm runtime wazero wasmtime etc
  * static hermes
  * nashorn_ot variant, record flags
  * jscript via wine
  * CI
    * rebuild nightly and/or tag push
    * make sure all dockerfiles point to master/lkgr-like
    * update.py to gen github workflows
    * lightweight bench
    * profile builds - time/space, optimize
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
  * test minimalistic ES5 engine (mujs, duktape, spidermonkey_1.8.5 etc) + transpilers on conformance test suite
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
