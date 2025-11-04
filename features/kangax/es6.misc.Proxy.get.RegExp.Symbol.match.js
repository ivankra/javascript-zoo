// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
// compat-table: ES6 > misc > Proxy, internal 'get' calls (tiny) > RegExp.prototype[Symbol.match]
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (typeof global === "undefined") global = this;

function testCode() {
  // RegExp.prototype[Symbol.match] -> Get -> [[Get]]
  var get = [];
  var p = new Proxy({ exec: function() { return null; } }, { get: function(o, k) { get.push(k); return o[k]; }});
  RegExp.prototype[Symbol.match].call(p);
  p.global = true;
  p.unicode = true;
  RegExp.prototype[Symbol.match].call(p);
  var str = get + '';
  return str === "global,exec,global,unicode,exec" || str === 'flags,exec,flags,exec';
}

try {
  if (testCode()) {
    console.log("es6.misc.Proxy.get.RegExp.Symbol.match.js: OK");
  } else {
    console.log("es6.misc.Proxy.get.RegExp.Symbol.match.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.Proxy.get.RegExp.Symbol.match.js: FAIL: " + e);
}