#!/usr/bin/env node
// Basic shell for JS-Interpreter that can run a file script and do REPL.
// Tested with Node, JSC/V8/SpiderMonkey/GraalJS shells.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

globalThis.acorn = require('./acorn');
require('./interpreter');

if (typeof print === 'undefined') {
  print = function(s) { console.log(s); };
}

if (typeof putstr === 'undefined') {
  putstr = function(s) {
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
  read = function(s) {
    return require('fs').readFileSync(s, 'utf8');
  };
}

if (typeof readline === 'undefined') {
  readline = function() {
    const fs = require('fs'), buf = Buffer.alloc(1), bytes = [];
    while (fs.readSync(0, buf) > 0 && buf[0] != 0x0A) {
      bytes.push(buf[0]);
    }
    return (bytes.length || buf[0]) ? Buffer.from(bytes).toString('utf-8') : null;
  };
}

var code =
    'while ((__line = __prompt()) !== null) {'
  + '  try {'
  + '    __res = eval(__line);'
  + '    if (typeof __res === "object") print(JSON.stringify(__res));'
  + '    else if (typeof __res !== "undefined") print("" + __res);'
  + '  } catch (__err) {'
  + '    print("" + __err);'
  + '  }'
  + '}';

if (typeof scriptArgs === 'undefined') {
  if (typeof process === 'object' && process.argv.length >= 2) {
    scriptArgs = process.argv.slice(2);
  } else if (typeof arguments === 'object' && typeof arguments[0] === 'string') {
    scriptArgs = new Array(arguments);
  }
}
if (typeof scriptArgs !== 'undefined') {
  // Some shells need -- (./jsc script.js -- args), some don't, drop for consistency.
  if (scriptArgs.length > 0 && scriptArgs[0] === '--') {
    scriptArgs.shift();
  }
  if (scriptArgs.length > 0) {
    code = read(scriptArgs[0]);
  }
}

var interpreter = new Interpreter(code, function(i, g) {
  var lastLine = null;
  i.setProperty(g, 'print', i.createNativeFunction(print));
  i.setProperty(g, '__prompt', i.createNativeFunction(function() {
    putstr('JS-Interpreter> ');
    var line = readline();
    // Some shells return empty string on EOF.
    if (line == null || (line === '' && lastLine === '')) return null;
    return lastLine = line;
  }));
});

interpreter.run();
