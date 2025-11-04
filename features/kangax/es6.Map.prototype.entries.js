// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-map-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries
// compat-table: ES6 > built-ins > Map (medium) > Map.prototype.entries
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Map.prototype.entries === "function";
}

try {
  if (testCode()) {
    console.log("es6.Map.prototype.entries.js: OK");
  } else {
    console.log("es6.Map.prototype.entries.js: FAIL");
  }
} catch (e) {
  console.log("es6.Map.prototype.entries.js: FAIL: " + e);
}