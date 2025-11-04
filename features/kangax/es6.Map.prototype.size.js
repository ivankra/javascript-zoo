// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-map-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size
// compat-table: ES6 > built-ins > Map (medium) > Map.prototype.size
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var key = {};
  var map = new Map();

  map.set(key, 123);

  return map.size === 1;
}

try {
  if (testCode()) {
    console.log("es6.Map.prototype.size.js: OK");
  } else {
    console.log("es6.Map.prototype.size.js: FAIL");
  }
} catch (e) {
  console.log("es6.Map.prototype.size.js: FAIL: " + e);
}