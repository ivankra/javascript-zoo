// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-map-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys
// compat-table: ES6 > built-ins > Map (medium) > Map.prototype.keys
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Map.prototype.keys === "function";
}

try {
  if (testCode()) {
    console.log("es6.Map.prototype.keys.js: OK");
  } else {
    console.log("es6.Map.prototype.keys.js: FAIL");
  }
} catch (e) {
  console.log("es6.Map.prototype.keys.js: FAIL: " + e);
}