OCTANE_PARTS := \
   richards.js \
   deltablue.js \
   crypto.js \
   raytrace.js \
   earley-boyer.js \
   regexp.js \
   splay.js \
   navier-stokes.js \
   pdfjs.js \
   mandreel.js \
   gbemu-part1.js \
   gbemu-part2.js \
   code-load.js \
   box2d.js \
   zlib.js \
   zlib-data.js \
   typescript.js \
   typescript-input.js \
   typescript-compiler.js

OCTANE_TESTS := \
   richards.js \
   deltablue.js \
   crypto.js \
   raytrace.js \
   earley-boyer.js \
   regexp.js \
   splay.js \
   navier-stokes.js \
   pdfjs.js \
   mandreel.js \
   gbemu.js \
   code-load.js \
   box2d.js \
   zlib.js \
   typescript.js

all: v9.js

# Generate self-contained test files from octane benchmark
v9.js: octane/zlib.js Makefile
	for x in $(OCTANE_PARTS); do rm -f "_$$x"; cp -f "octane/$$x" "_$$x"; done
	# Make the environment more uniform across different js shells:
	# - print() polyfill
	# - undefine read/require for zlib and typescript tests that probe them
	#   and might go off track depending on how these two are defined.
	echo '// Single self-contained test from octane benchmark (https://github.com/chromium/octane)' >head.js
	echo 'if (typeof print == "undefined" && typeof "console" != "undefined") { if (typeof globalThis != "undefined") globalThis.print = console.log; else print = console.log; }' >>head.js
	echo 'var read=undefined, require=undefined;' >>head.js
	cat octane/base.js >>head.js
	# Generate combined test: v9.js
	cat octane/run.js | sed -Ee 's|^load|//load|' >tail.js
	cat head.js $(patsubst %,_%,$(OCTANE_PARTS)) tail.js >v9.js
	# Generate self-contained single tests, don't print overall score.
	cat octane/run.js | sed -Ee 's|^load|//load|; s|^(function PrintScore.*)|\1 return;|' >tail.js
	for x in richards.js deltablue.js crypto.js raytrace.js earley-boyer.js regexp.js splay.js navier-stokes.js pdfjs.js mandreel.js code-load.js box2d.js; do \
	  cat head.js "_$$x" tail.js >"$$x"; \
	done
	cat head.js _gbemu-part1.js _gbemu-part2.js tail.js >gbemu.js
	cat head.js _typescript.js _typescript-input.js _typescript-compiler.js tail.js >typescript.js
	cat head.js _zlib.js _zlib-data.js tail.js >zlib.js
	# QuickJS-NG fails some single tests without mandreel.js in the mix
	cat head.js _pdfjs.js _mandreel.js _gbemu-part1.js _gbemu-part2.js _code-load.js tail.js >mandreel-gbemu-codeload.js
	rm -rf head.js tail.js $(patsubst %,_%,$(OCTANE_PARTS))

octane/zlib.js:
	git submodule update --init --recursive

clean:
	rm -f head.js tail.js v9.js mandreel-plus.js $(OCTANE_TESTS) $(patsubst %,_%,$(OCTANE_PARTS))
