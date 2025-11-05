// compat-table: ES6 > built-ins > Map (medium) > constructor arguments
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-map-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var key1 = {};
  var key2 = {};
  var map = new Map([[key1, 123], [key2, 456]]);

  return map.has(key1) && map.get(key1) === 123 &&
         map.has(key2) && map.get(key2) === 456;
}

try {
  if (testCode()) {
    console.log("kangax-es6/Map.constructor-arguments.js: OK");
  } else {
    console.log("kangax-es6/Map.constructor-arguments.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Map.constructor-arguments.js: exception: " + e);
}
