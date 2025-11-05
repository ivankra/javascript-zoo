// compat-table: ES6 > misc > Proxy, internal 'get' calls (tiny) > String.raw
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // String.raw -> Get -> [[Get]]
  var get = [];
  var raw = new Proxy({length: 2, 0: '', 1: ''}, { get: function(o, k) { get.push(k); return o[k]; }});
  var p = new Proxy({raw: raw}, { get: function(o, k) { get.push(k); return o[k]; }});
  String.raw(p);
  return get + '' === "raw,length,0,1";
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.Proxy.get.String.raw.js: OK");
  } else {
    console.log("kangax-es6/misc.Proxy.get.String.raw.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.Proxy.get.String.raw.js: exception: " + e);
}
