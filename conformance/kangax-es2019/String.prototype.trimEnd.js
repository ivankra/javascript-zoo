// compat-table: ES2016+ > 2019 features > string trimming (small) > String.prototype.trimEnd
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimEnd
// spec: https://github.com/tc39/proposal-string-left-right-trim
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return ' \t \n abc   \t\n'.trimEnd() === ' \t \n abc';
}

try {
  if (testCode()) {
    console.log("kangax-es2019/String.prototype.trimEnd.js: OK");
  } else {
    console.log("kangax-es2019/String.prototype.trimEnd.js: failed");
  }
} catch (e) {
  console.log("kangax-es2019/String.prototype.trimEnd.js: exception: " + e);
}
