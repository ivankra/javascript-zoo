// ES6: http://www.ecma-international.org/ecma-402/1.0/#sec-8
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
// compat-table: ES Intl > Intl object > exists on global
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Intl === 'object';
}

try {
  if (testCode()) {
    console.log("esintl.Intl.js: OK");
  } else {
    console.log("esintl.Intl.js: FAIL");
  }
} catch (e) {
  console.log("esintl.Intl.js: FAIL: " + e);
}