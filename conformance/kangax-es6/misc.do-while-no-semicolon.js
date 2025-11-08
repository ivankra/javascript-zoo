// compat-table: ES6 > misc > miscellaneous (small) > no semicolon needed after do-while
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-additions-and-changes-that-introduce-incompatibilities-with-prior-editions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  do {} while (false) return true;
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.do-while-no-semicolon.js: OK");
  } else {
    console.log("kangax-es6/misc.do-while-no-semicolon.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.do-while-no-semicolon.js: exception: " + e);
}
