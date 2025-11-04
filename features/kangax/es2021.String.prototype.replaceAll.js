// ES6: https://github.com/tc39/proposal-string-replace-all
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll
// compat-table: ES2016+ > 2021 features > String.prototype.replaceAll (small)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return 'q=query+string+parameters'.replaceAll('+', ' ') === 'q=query string parameters';
}

try {
  if (testCode()) {
    console.log("es2021.String.prototype.replaceAll.js: OK");
  } else {
    console.log("es2021.String.prototype.replaceAll.js: FAIL");
  }
} catch (e) {
  console.log("es2021.String.prototype.replaceAll.js: FAIL: " + e);
}