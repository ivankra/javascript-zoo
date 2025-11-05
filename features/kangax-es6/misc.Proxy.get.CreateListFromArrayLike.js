// compat-table: ES6 > misc > Proxy, internal 'get' calls (tiny) > CreateListFromArrayLike
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // CreateListFromArrayLike -> Get -> [[Get]]
  var get = [];
  var p = new Proxy({length:2, 0:0, 1:0}, { get: function(o, k) { get.push(k); return o[k]; }});
  Function.prototype.apply({}, p);
  return get + '' === "length,0,1";
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.Proxy.get.CreateListFromArrayLike.js: OK");
  } else {
    console.log("kangax-es6/misc.Proxy.get.CreateListFromArrayLike.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.Proxy.get.CreateListFromArrayLike.js: exception: " + e);
}
