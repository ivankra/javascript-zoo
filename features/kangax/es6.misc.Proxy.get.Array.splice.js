// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
// compat-table: ES6 > misc > Proxy, internal 'get' calls (tiny) > Array.prototype.splice
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Array.prototype.splice -> Get -> [[Get]]
  var get = [];
  var p = new Proxy([0,1,2,3], { get: function(o, k) { get.push(k); return o[k]; }});
  Array.prototype.splice.call(p,1,1);
  Array.prototype.splice.call(p,1,0,1);
  return get + '' === "length,constructor,1,2,3,length,constructor,2,1";
}

try {
  if (testCode()) {
    console.log("es6.misc.Proxy.get.Array.splice.js: OK");
  } else {
    console.log("es6.misc.Proxy.get.Array.splice.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.Proxy.get.Array.splice.js: FAIL: " + e);
}