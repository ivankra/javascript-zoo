// ES6: http://www.ecma-international.org/ecma-402/1.0/#sec-11
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
// compat-table: ES Intl > NumberFormat > exists on intl object
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Intl.NumberFormat === 'function';
}

try {
  if (testCode()) {
    console.log("esintl.Intl.NumberFormat.js: OK");
  } else {
    console.log("esintl.Intl.NumberFormat.js: FAIL");
  }
} catch (e) {
  console.log("esintl.Intl.NumberFormat.js: FAIL: " + e);
}