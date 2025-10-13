#!/usr/bin/env node
// Basic shell for SandboxJS that can run a file script and do REPL.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

const Sandbox = require('./dist/node/Sandbox.js').default;

if (typeof print === 'undefined') {
  globalThis.print = function(s) { console.log(s); };
}

if (typeof putstr === 'undefined') {
  globalThis.putstr = function(s) {
    if (typeof d8 !== 'undefined' && typeof write !== 'undefined') {
      write(s);
    } else if (typeof process === 'object') {
      process.stdout.write(s);
    } else {
      print(s);
    }
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
  const sandbox = new Sandbox({
    globals: {...Sandbox.SAFE_GLOBALS, print},
    prototypeWhitelist: Sandbox.SAFE_PROTOTYPES
  });
  const scope = {};

  if (Array.isArray(scriptArgs) && scriptArgs[0] === '--') {
    scriptArgs.shift();
  }
  if (Array.isArray(scriptArgs) && scriptArgs.length > 0) {
    const code = read(scriptArgs[0]);
    sandbox.compile(code)(scope).run();
    return;
  }

  let lastLine = null;
  while (true) {
    putstr('SandboxJS> ');
    const line = readline();
    // Some shells return empty string on EOF.
    if (line == null || (line === '' && lastLine === '')) break;
    lastLine = line;

    // Try to compile as expression first in order to print its result
    if (!line.match(/[={;]/)) {
      let exec = null;
      try { exec = sandbox.compile('return ' + line); } catch (e) {};
      if (exec !== null) {
        try {
          const res = exec(scope).run();
          print(typeof res !== 'object' ? "" + res : JSON.stringify(res));
        } catch (e) {
          print("" + e);
        }
        continue;
      }
    }

    try {
      sandbox.compile(line)(scope).run();
    } catch (e) {
      print("" + e);
    }
  }
})();
