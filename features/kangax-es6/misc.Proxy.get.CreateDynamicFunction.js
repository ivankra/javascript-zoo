// compat-table: ES6 > misc > Proxy, internal 'get' calls (tiny) > CreateDynamicFunction
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // CreateDynamicFunction -> GetPrototypeFromConstructor -> Get -> [[Get]]
  var get = [];
  var p = new Proxy(Function, { get: function(o, k) { get.push(k); return o[k]; }});
  new p;
  return get + '' === "prototype";
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.Proxy.get.CreateDynamicFunction.js: OK");
  } else {
    console.log("kangax-es6/misc.Proxy.get.CreateDynamicFunction.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.Proxy.get.CreateDynamicFunction.js: exception: " + e);
}
