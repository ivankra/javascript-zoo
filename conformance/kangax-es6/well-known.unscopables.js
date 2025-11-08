// compat-table: ES6 > built-ins > well-known symbols (medium) > Symbol.unscopables
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/unscopables
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var a = { foo: 1, bar: 2 };
  a[Symbol.unscopables] = { bar: true };
  with (a) {
    return foo === 1 && typeof bar === "undefined";
  }
}

try {
  if (testCode()) {
    console.log("kangax-es6/well-known.unscopables.js: OK");
  } else {
    console.log("kangax-es6/well-known.unscopables.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/well-known.unscopables.js: exception: " + e);
}
