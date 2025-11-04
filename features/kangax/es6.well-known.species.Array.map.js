// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols
// compat-table: ES6 > built-ins > well-known symbols (medium) > Symbol.species, Array.prototype.map
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var obj = [];
  obj.constructor = {};
  obj.constructor[Symbol.species] = function() {
      return { foo: 1 };
  };
  return Array.prototype.map.call(obj, Boolean).foo === 1;
}

try {
  if (testCode()) {
    console.log("es6.well-known.species.Array.map.js: OK");
  } else {
    console.log("es6.well-known.species.Array.map.js: FAIL");
  }
} catch (e) {
  console.log("es6.well-known.species.Array.map.js: FAIL: " + e);
}