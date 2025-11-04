// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
// compat-table: ES6 > misc > Proxy, internal 'get' calls (tiny) > HasBinding
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // HasBinding -> Get -> [[Get]]
  var get = [];
  var p = new Proxy({foo:1}, { get: function(o, k) { get.push(k); return o[k]; }});
  p[Symbol.unscopables] = p;
  with(p) {
    typeof foo;
  }
  return get[0] === Symbol.unscopables && get.slice(1) + '' === "foo";
}

try {
  if (testCode()) {
    console.log("es6.misc.Proxy.get.HasBinding.js: OK");
  } else {
    console.log("es6.misc.Proxy.get.HasBinding.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.Proxy.get.HasBinding.js: FAIL: " + e);
}