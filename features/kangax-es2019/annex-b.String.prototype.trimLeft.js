// compat-table: ES2016+ > 2019 features > string trimming (small) > String.prototype.trimLeft
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/TrimLeft
// spec: https://github.com/tc39/proposal-string-left-right-trim
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return ' \t \n abc   \t\n'.trimLeft() === 'abc   \t\n';
}

try {
  if (testCode()) {
    console.log("kangax-es2019/annex-b.String.prototype.trimLeft.js: OK");
  } else {
    console.log("kangax-es2019/annex-b.String.prototype.trimLeft.js: failed");
  }
} catch (e) {
  console.log("kangax-es2019/annex-b.String.prototype.trimLeft.js: exception: " + e);
}
