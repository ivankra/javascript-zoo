// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
// compat-table: ES6 > misc > Proxy, internal 'get' calls (tiny) > String.prototype.match
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // String.prototype.match -> Get -> [[Get]]
  var get = [];
  var proxied = {};
  proxied[Symbol.toPrimitive] = Function();
  var p = new Proxy(proxied, { get: function(o, k) { get.push(k); return o[k]; }});
  "".match(p);
  return get[0] === Symbol.match && get[1] === Symbol.toPrimitive && get.length === 2;
}

try {
  if (testCode()) {
    console.log("es6.misc.Proxy.get.String.match.js: OK");
  } else {
    console.log("es6.misc.Proxy.get.String.match.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.Proxy.get.String.match.js: FAIL: " + e);
}