// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-additions-and-changes-that-introduce-incompatibilities-with-prior-editions
// compat-table: ES6 > misc > miscellaneous (small) > Invalid Date
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return new Date(NaN) + "" === "Invalid Date";
}

try {
  if (testCode()) {
    console.log("es6.misc.Invalid-Date.js: OK");
  } else {
    console.log("es6.misc.Invalid-Date.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.Invalid-Date.js: FAIL: " + e);
}