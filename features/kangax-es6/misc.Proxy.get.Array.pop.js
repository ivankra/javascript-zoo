// compat-table: ES6 > misc > Proxy, internal 'get' calls (tiny) > Array.prototype.pop
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Array.prototype.pop -> Get -> [[Get]]
  var get = [];
  var p = new Proxy([0,1,2,3], { get: function(o, k) { get.push(k); return o[k]; }});
  Array.prototype.pop.call(p);
  return get + '' === "length,3";
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.Proxy.get.Array.pop.js: OK");
  } else {
    console.log("kangax-es6/misc.Proxy.get.Array.pop.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.Proxy.get.Array.pop.js: exception: " + e);
}
