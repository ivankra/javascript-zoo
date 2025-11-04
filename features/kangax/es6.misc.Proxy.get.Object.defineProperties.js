// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
// compat-table: ES6 > misc > Proxy, internal 'get' calls (tiny) > Object.defineProperties
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Object.defineProperties -> Get -> [[Get]]
  var get = [];
  var p = new Proxy({foo:{}, bar:{}}, { get: function(o, k) { get.push(k); return o[k]; }});
  Object.defineProperties({}, p);
  return get + '' === "foo,bar";
}

try {
  if (testCode()) {
    console.log("es6.misc.Proxy.get.Object.defineProperties.js: OK");
  } else {
    console.log("es6.misc.Proxy.get.Object.defineProperties.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.Proxy.get.Object.defineProperties.js: FAIL: " + e);
}