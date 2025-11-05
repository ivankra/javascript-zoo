// compat-table: ES6 > built-ins > well-known symbols (medium) > Symbol.species, RegExp.prototype[Symbol.split]
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = false;
  var obj = { constructor: {} };
  obj[Symbol.split] = RegExp.prototype[Symbol.split];
  obj.constructor[Symbol.species] = function() {
    passed = true;
    return /./;
  };
  "".split(obj);
  return passed;
}

try {
  if (testCode()) {
    console.log("kangax-es6/well-known.species.RegExp.split.js: OK");
  } else {
    console.log("kangax-es6/well-known.species.RegExp.split.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/well-known.species.RegExp.split.js: exception: " + e);
}
