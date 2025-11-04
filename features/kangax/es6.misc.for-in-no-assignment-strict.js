// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-additions-and-changes-that-introduce-incompatibilities-with-prior-editions
// compat-table: ES6 > misc > miscellaneous (small) > no assignments allowed in for-in head in strict mode
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  try {
    eval('for (var i = 0 in {}) {}');
  }
  catch(e) {
    return true;
  }
}

try {
  if (testCode()) {
    console.log("es6.misc.for-in-no-assignment-strict.js: OK");
  } else {
    console.log("es6.misc.for-in-no-assignment-strict.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.for-in-no-assignment-strict.js: FAIL: " + e);
}