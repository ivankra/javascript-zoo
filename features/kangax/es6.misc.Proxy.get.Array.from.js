// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
// compat-table: ES6 > misc > Proxy, internal 'get' calls (tiny) > Array.from
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Array.from -> Get -> [[Get]]
  var get = [];
  var p = new Proxy({length: 2, 0: '', 1: ''}, { get: function(o, k) { get.push(k); return o[k]; }});
  Array.from(p);
  return get[0] === Symbol.iterator && get.slice(1) + '' === "length,0,1";
}

try {
  if (testCode()) {
    console.log("es6.misc.Proxy.get.Array.from.js: OK");
  } else {
    console.log("es6.misc.Proxy.get.Array.from.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.Proxy.get.Array.from.js: FAIL: " + e);
}