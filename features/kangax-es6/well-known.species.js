// compat-table: ES6 > built-ins > well-known symbols (medium) > Symbol.species, existence
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/species
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return "species" in Symbol;
}

try {
  if (testCode()) {
    console.log("kangax-es6/well-known.species.js: OK");
  } else {
    console.log("kangax-es6/well-known.species.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/well-known.species.js: exception: " + e);
}
