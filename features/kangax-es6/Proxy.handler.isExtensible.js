// compat-table: ES6 > built-ins > Proxy (large) > "isExtensible" handler
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/isExtensible
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var proxied = {};
  var passed = false;
  Object.isExtensible(
    new Proxy(proxied, {
      isExtensible: function (t) {
        passed = t === proxied; return true;
      }
    })
  );
  return passed;
}

try {
  if (testCode()) {
    console.log("kangax-es6/Proxy.handler.isExtensible.js: OK");
  } else {
    console.log("kangax-es6/Proxy.handler.isExtensible.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Proxy.handler.isExtensible.js: exception: " + e);
}
