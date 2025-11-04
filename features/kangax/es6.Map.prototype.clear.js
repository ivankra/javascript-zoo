// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-map-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear
// compat-table: ES6 > built-ins > Map (medium) > Map.prototype.clear
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Map.prototype.clear === "function";
}

try {
  if (testCode()) {
    console.log("es6.Map.prototype.clear.js: OK");
  } else {
    console.log("es6.Map.prototype.clear.js: FAIL");
  }
} catch (e) {
  console.log("es6.Map.prototype.clear.js: FAIL: " + e);
}