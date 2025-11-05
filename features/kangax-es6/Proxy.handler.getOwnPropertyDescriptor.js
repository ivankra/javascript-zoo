// compat-table: ES6 > built-ins > Proxy (large) > "getOwnPropertyDescriptor" handler
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var proxied = {};
  var fakeDesc = { value: "foo", configurable: true };
  var returnedDesc = Object.getOwnPropertyDescriptor(
    new Proxy(proxied, {
      getOwnPropertyDescriptor: function (t, k) {
        return t === proxied && k === "foo" && fakeDesc;
      }
    }),
    "foo"
  );
  return (returnedDesc.value     === fakeDesc.value
    && returnedDesc.configurable === fakeDesc.configurable
    && returnedDesc.writable     === false
    && returnedDesc.enumerable   === false);
}

try {
  if (testCode()) {
    console.log("kangax-es6/Proxy.handler.getOwnPropertyDescriptor.js: OK");
  } else {
    console.log("kangax-es6/Proxy.handler.getOwnPropertyDescriptor.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Proxy.handler.getOwnPropertyDescriptor.js: exception: " + e);
}
