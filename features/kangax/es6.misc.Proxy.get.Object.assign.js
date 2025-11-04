// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
// compat-table: ES6 > misc > Proxy, internal 'get' calls (tiny) > Object.assign
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Object.assign -> Get -> [[Get]]
  var get = [];
  var p = new Proxy({foo:1, bar:2}, { get: function(o, k) { get.push(k); return o[k]; }});
  Object.assign({}, p);
  return get + '' === "foo,bar";
}

try {
  if (testCode()) {
    console.log("es6.misc.Proxy.get.Object.assign.js: OK");
  } else {
    console.log("es6.misc.Proxy.get.Object.assign.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.Proxy.get.Object.assign.js: FAIL: " + e);
}