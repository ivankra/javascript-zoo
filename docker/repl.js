// Basic REPL for some shells without it.
// Depends on eval() and readline() built-ins.
//
// Tested:
//   * chakracore dmdscript dscriptcpp (no own REPL)
//   * v8 jsc spidermonkey graaljs
//   * node
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (typeof console == 'undefined' && typeof readln != 'undefined' &&
    typeof print != 'undefined' && typeof println != 'undefined') {
  // dmdscript, dscriptcpp
  console = {log: println};
  putstr = print;
  print = println;
  readline = readln;
}

if (typeof print == 'undefined' && typeof console != 'undefined') {
  print = function(s) { console.log(s); };
}

// putstr: SpiderMonkey's print() without newline
if (typeof putstr == 'undefined') {
  if (typeof d8 != 'undefined' && typeof write != 'undefined') {
    // V8
    putstr = write;
  } else if (typeof process == 'object') {
    // Node API, must be wrapped in function
    putstr = function(s) { process.stdout.write(s); }
  } else if (typeof print != 'undefined') {
    putstr = print;
  }
}

if (typeof readline == 'undefined' && typeof require != 'undefined') {
  // Node API
  readline = function() {
    var fs = require('fs'), buf = Buffer.alloc(1), bytes = [];
    while (fs.readSync(0, buf) > 0 && buf[0] != 0x0A) bytes.push(buf[0]);
    return (bytes.length || buf[0]) ? Buffer.from(bytes).toString('utf-8') : null;
  };
}

var __lastLine;  // help detect EOF as two empty line on some shells

for (;;) {
  putstr('> ');

  var __line = readline();
  if (__line == null || (__line == '' && __lastLine == '')) {
    break;
  }

  __lastLine = __line;

  try {
    var __res = eval(__line);
    if (typeof __res == "object" && typeof JSON != "undefined") {
      print(JSON.stringify(__res));
    } else if (typeof __res != "undefined") {
      print("" + __res);
    }
  } catch (__err) {
    print("" + __err);
  }
}
