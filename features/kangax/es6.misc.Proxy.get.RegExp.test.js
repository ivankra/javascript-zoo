// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
// compat-table: ES6 > misc > Proxy, internal 'get' calls (tiny) > RegExp.prototype.test
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // RegExp.prototype.test -> RegExpExec -> Get -> [[Get]]
  var get = [];
  var p = new Proxy({ exec: function() { return null; } }, { get: function(o, k) { get.push(k); return o[k]; }});
  RegExp.prototype.test.call(p);
  return get + '' === "exec";
}

try {
  if (testCode()) {
    console.log("es6.misc.Proxy.get.RegExp.test.js: OK");
  } else {
    console.log("es6.misc.Proxy.get.RegExp.test.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.Proxy.get.RegExp.test.js: FAIL: " + e);
}