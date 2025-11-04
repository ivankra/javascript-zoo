// compat-table: ES5 > Miscellaneous (medium) > Zero-width chars in identifiers
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var _\u200c\u200d = true;
  return _\u200c\u200d;
}

try {
  if (testCode()) {
    console.log("es5.misc.zero-width-identifiers.js: OK");
  } else {
    console.log("es5.misc.zero-width-identifiers.js: FAIL");
  }
} catch (e) {
  console.log("es5.misc.zero-width-identifiers.js: FAIL: " + e);
}