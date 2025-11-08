// compat-table: ES6 > misc > miscellaneous (small) > Invalid Date
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-additions-and-changes-that-introduce-incompatibilities-with-prior-editions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return new Date(NaN) + "" === "Invalid Date";
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.Invalid-Date.js: OK");
  } else {
    console.log("kangax-es6/misc.Invalid-Date.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.Invalid-Date.js: exception: " + e);
}
