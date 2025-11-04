// ES6: http://www.ecma-international.org/ecma-402/1.0/#sec-10.1.2.1
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
// compat-table: ES Intl > DateTimeFormat > constructor called without new creates instances
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Intl.DateTimeFormat() instanceof Intl.DateTimeFormat;
}

try {
  if (testCode()) {
    console.log("esintl.Intl.DateTimeFormat.without-new.js: OK");
  } else {
    console.log("esintl.Intl.DateTimeFormat.without-new.js: FAIL");
  }
} catch (e) {
  console.log("esintl.Intl.DateTimeFormat.without-new.js: FAIL: " + e);
}