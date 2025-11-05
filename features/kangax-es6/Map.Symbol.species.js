// compat-table: ES6 > built-ins > Map (medium) > Map[Symbol.species]
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/@@species
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-map-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var prop = Object.getOwnPropertyDescriptor(Map, Symbol.species);
  return 'get' in prop && Map[Symbol.species] === Map;
}

try {
  if (testCode()) {
    console.log("kangax-es6/Map.Symbol.species.js: OK");
  } else {
    console.log("kangax-es6/Map.Symbol.species.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Map.Symbol.species.js: exception: " + e);
}
