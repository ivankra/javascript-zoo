// ES6: http://www.ecma-international.org/ecma-402/1.0/#sec-12
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
// compat-table: ES Intl > DateTimeFormat > exists on intl object
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Intl.DateTimeFormat === 'function';
}

try {
  if (testCode()) {
    console.log("esintl.Intl.DateTimeFormat.js: OK");
  } else {
    console.log("esintl.Intl.DateTimeFormat.js: FAIL");
  }
} catch (e) {
  console.log("esintl.Intl.DateTimeFormat.js: FAIL: " + e);
}