// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-additions-and-changes-that-introduce-incompatibilities-with-prior-editions
// compat-table: ES6 > misc > miscellaneous (small) > RegExp constructor can alter flags
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (typeof global === "undefined") global = this;

function testCode() {
  return new RegExp(/./im, "g").global === true;
}

try {
  if (testCode()) {
    console.log("es6.misc.RegExp-alter-flags.js: OK");
  } else {
    console.log("es6.misc.RegExp-alter-flags.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.RegExp-alter-flags.js: FAIL: " + e);
}