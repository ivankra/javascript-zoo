ARG BASE=jsz-node
FROM $BASE

ARG REPO=https://github.com/NeilFraser/JS-Interpreter.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV"

RUN npm install esbuild

# Add a basic shell that can run a file and do REPL
RUN cat >shell_snippet.js <<EOF
globalThis.acorn = require('./acorn');

if (typeof print === 'undefined') {
  globalThis.print = function(s) { console.log(s); };
}
if (typeof putstr === 'undefined') {
  globalThis.putstr = function(s) {
    (typeof process === 'object' ? process.stdout.write(s) : print(s));
  };
}
if (typeof read === 'undefined') {
  globalThis.read = function(s) {
    return require('fs').readFileSync(s, 'utf8');
  };
}
if (typeof readline === 'undefined') {
  globalThis.readline = function() {
    const fs = require('fs'), buf = Buffer.alloc(1), bytes = [];
    while (fs.readSync(0, buf) > 0 && buf[0] != 0x0A) {
      bytes.push(buf[0]);
    }
    return (bytes.length || buf[0]) ? Buffer.from(bytes).toString('utf-8') : null;
  };
}
if (typeof scriptArgs === 'undefined') {
  if (typeof process === 'object' && process.argv.length >= 2) {
    globalThis.scriptArgs = process.argv.slice(2);
  } else if (typeof arguments === 'object' && typeof arguments[0] === 'string') {
    globalThis.scriptArgs = new Array(arguments);
  }
}

(function() {
  var code = typeof scriptArgs === 'undefined' || scriptArgs.length == 0
      ? 'while ((__line = __input()) !== null) {'
      + '  try {'
      + '    __res = eval(__line);'
      + '    if (typeof __res === "object") print(JSON.stringify(__res));'
      + '    else if (typeof __res !== "undefined") print("" + __res);'
      + '  } catch (__err) {'
      + '    print("" + __err);'
      + '  }'
      + '}'
      : read(scriptArgs[0]);
  var interpreter = new Interpreter(code, function(i, g) {
    i.setProperty(g, 'print', i.createNativeFunction(print));
    i.setProperty(g, '__input', i.createNativeFunction(
      function() { putstr("JS-Interpreter> "); return readline(); }));
  });
  interpreter.run();
}).call(globalThis);
EOF

RUN sed -i '1i#!/usr/bin/env node' interpreter.js && \
    cat shell_snippet.js >>interpreter.js && \
    npx esbuild interpreter.js --bundle --outfile=/dist/js-interpreter --platform=node

ENV JS_BINARY=/dist/js-interpreter
CMD ${JS_BINARY}
