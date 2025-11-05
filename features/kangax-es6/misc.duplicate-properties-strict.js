// compat-table: ES6 > misc > miscellaneous (small) > duplicate property names in strict mode
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-additions-and-changes-that-introduce-incompatibilities-with-prior-editions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  return this === void undefined && ({ a:1, a:1 }).a === 1;
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.duplicate-properties-strict.js: OK");
  } else {
    console.log("kangax-es6/misc.duplicate-properties-strict.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.duplicate-properties-strict.js: exception: " + e);
}
