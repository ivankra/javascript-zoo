// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// compat-table: ES6 > built-ins > Proxy (large) > no "prototype" property
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  new Proxy({}, {});
  return !Proxy.hasOwnProperty('prototype');
}

try {
  if (testCode()) {
    console.log("es6.Proxy.no-prototype.js: OK");
  } else {
    console.log("es6.Proxy.no-prototype.js: FAIL");
  }
} catch (e) {
  console.log("es6.Proxy.no-prototype.js: FAIL: " + e);
}