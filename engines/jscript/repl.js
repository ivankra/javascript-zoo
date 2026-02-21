// REPL script for JScript/Chakra family of engines.
//
// Tested with:
//   * JScript 5.7/5.8/Wine + Windows Script Host (wscript.exe)
//   * ChakraCore shell
//     Ref: https://github.com/chakra-core/ChakraCore/blob/master/bin/ch/WScriptJsrt.cpp#L1085
//   * engines/jscript/jscript.cc
//   * engines/jscript9/jsrt.cc
//
// jscript.cc/jsrt.cc both embed a copy of this script to implement REPL.
//
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

(function() {
  // JSON.stringify polyfill for JScript engine (ES3)
  var __stringify = (function() {
    if (typeof JSON === 'object' && typeof JSON.stringify === 'function') {
      return JSON.stringify;
    }

    var esc = {'"':'\\"','\\':'\\\\','\b':'\\b','\f':'\\f','\n':'\\n','\r':'\\r','\t':'\\t'};
    var ts = Object.prototype.toString;

    function str(s) {
      for (var r = '"', i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        r += esc[c] || (c < ' ' ? '\\u' + ('000' + c.charCodeAt(0).toString(16)).slice(-4) : c);
      }
      return r + '"';
    }

    function go(v, seen) {
      if (v === null) return 'null';
      if (typeof v !== 'object') return '' + v;

      for (var i = 0; i < seen.length; i++) {
        if (seen[i] === v) return '[Circular]';
      }
      seen.push(v);

      var out = [], isArr = ts.call(v) === '[object Array]';
      if (isArr) {
        for (var j = 0; j < v.length; j++) {
          var x = go(v[j], seen);
          out.push(x === undefined ? 'null' : x);
        }
      } else {
        for (var k in v) {
          if (v.hasOwnProperty(k)) {
            var y = go(v[k], seen);
            if (y !== undefined) out.push(str(k) + ':' + y);
          }
        }
      }
      seen.pop();
      return isArr ? '[' + out + ']' : '{' + out + '}';
    }

    return function(v) { return go(v, []); };
  })();

  while (true) {
    if (typeof WScript.StdOut === 'object' && typeof WScript.StdOut.Write !== 'undefined') {
      WScript.StdOut.Write('> ');  // no newline
    } else {
      WScript.Echo('> ');  // +newline but chakracore doesn't have an alternative
    }

    if (typeof WScript.StdIn === 'object' && WScript.StdIn.AtEndOfStream) break;

    var __line = typeof readline !== 'undefined' ? readline() : WScript.StdIn.ReadLine();
    if (__line === undefined || __line === null) break;

    __line = ('' + __line).replace(/^\s+|\s+$/g, '');
    if (__line === '') continue;
    if (__line === 'exit' || __line === 'quit') break
    if (__line == '\x04') break;  // Unix-style EOF with Ctrl-D

    try {
      // Note: not global eval on old JScript, so keep locals prefixed with __
      var __res = (0, eval)(__line);
      if (typeof __res !== 'undefined') {
        WScript.Echo(typeof __res !== 'object' ? '' + __res : __stringify(__res));
      }
    } catch (__err) {
      var __name = __err && __err.name;
      var __msg = __err && __err.message;
      WScript.Echo('Uncaught ' + (__name ? __name + ': ' : '') + (__msg || __err));
    }
  }
})();
