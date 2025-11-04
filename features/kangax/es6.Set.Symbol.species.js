// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-set-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/@@species
// compat-table: ES6 > built-ins > Set (medium) > Set[Symbol.species]
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var prop = Object.getOwnPropertyDescriptor(Set, Symbol.species);
  return 'get' in prop && Set[Symbol.species] === Set;
}

try {
  if (testCode()) {
    console.log("es6.Set.Symbol.species.js: OK");
  } else {
    console.log("es6.Set.Symbol.species.js: FAIL");
  }
} catch (e) {
  console.log("es6.Set.Symbol.species.js: FAIL: " + e);
}