// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
// compat-table: ES6 > misc > Proxy, internal 'get' calls (tiny) > RegExp.prototype[Symbol.replace]
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (typeof global === "undefined") global = this;

function testCode() {
  // RegExp.prototype[Symbol.replace] -> Get -> [[Get]]
  var get = [];
  var p = new Proxy({ exec: function() { return null; } }, { get: function(o, k) { get.push(k); return o[k]; }});
  RegExp.prototype[Symbol.replace].call(p);
  p.global = true;
  RegExp.prototype[Symbol.replace].call(p);
  var str = get + '';
  return str === "global,exec,global,unicode,exec" || str === 'flags,exec,flags,exec';
}

try {
  if (testCode()) {
    console.log("es6.misc.Proxy.get.RegExp.Symbol.replace.js: OK");
  } else {
    console.log("es6.misc.Proxy.get.RegExp.Symbol.replace.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.Proxy.get.RegExp.Symbol.replace.js: FAIL: " + e);
}