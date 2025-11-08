// compat-table: ES6 > misc > Proxy, internal 'get' calls (tiny) > RegExp.prototype[Symbol.split]
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // RegExp.prototype[Symbol.split] -> Get -> [[Get]]
  var get = [];
  var constructor = Function();
  constructor[Symbol.species] = Object;
  var p = new Proxy({ constructor: constructor, flags: '', exec: function() { return null; } }, { get: function(o, k) { get.push(k); return o[k]; }});
  RegExp.prototype[Symbol.split].call(p, "");
  return get + '' === "constructor,flags,exec";
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.Proxy.get.RegExp.Symbol.split.js: OK");
  } else {
    console.log("kangax-es6/misc.Proxy.get.RegExp.Symbol.split.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.Proxy.get.RegExp.Symbol.split.js: exception: " + e);
}
