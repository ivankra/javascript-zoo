// compat-table: ES6 > built-ins > Proxy (large) > constructor requires new
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  new Proxy({}, {});
  try {
    Proxy({}, {});
    return false;
  } catch(e) {
    return true;
  }
}

try {
  if (testCode()) {
    console.log("kangax-es6/Proxy.constructor-requires-new.js: OK");
  } else {
    console.log("kangax-es6/Proxy.constructor-requires-new.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Proxy.constructor-requires-new.js: exception: " + e);
}
