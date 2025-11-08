// compat-table: ES6 > built-ins > Proxy (large) > "setPrototypeOf" handler
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/setPrototypeOf
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var proxied = {};
  var newProto = {};
  var passed = false;
  Object.setPrototypeOf(
    new Proxy(proxied, {
      setPrototypeOf: function (t, p) {
        passed = t === proxied && p === newProto;
        return true;
      }
    }),
    newProto
  );
  return passed;
}

try {
  if (testCode()) {
    console.log("kangax-es6/Proxy.handler.setPrototypeOf.js: OK");
  } else {
    console.log("kangax-es6/Proxy.handler.setPrototypeOf.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Proxy.handler.setPrototypeOf.js: exception: " + e);
}
