// compat-table: ES6 > built-ins > well-known symbols (medium) > Symbol.species, Array.prototype.splice
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols
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
  return Array.prototype.splice.call(obj, 0).foo === 1;
}

try {
  if (testCode()) {
    console.log("kangax-es6/well-known.species.Array.splice.js: OK");
  } else {
    console.log("kangax-es6/well-known.species.Array.splice.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/well-known.species.Array.splice.js: exception: " + e);
}
