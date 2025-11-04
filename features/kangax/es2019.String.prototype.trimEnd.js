// ES6: https://github.com/tc39/proposal-string-left-right-trim
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimEnd
// compat-table: ES2016+ > 2019 features > string trimming (small) > String.prototype.trimEnd
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return ' \t \n abc   \t\n'.trimEnd() === ' \t \n abc';
}

try {
  if (testCode()) {
    console.log("es2019.String.prototype.trimEnd.js: OK");
  } else {
    console.log("es2019.String.prototype.trimEnd.js: FAIL");
  }
} catch (e) {
  console.log("es2019.String.prototype.trimEnd.js: FAIL: " + e);
}