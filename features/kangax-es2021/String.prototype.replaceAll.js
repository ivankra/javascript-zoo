// compat-table: ES2016+ > 2021 features > String.prototype.replaceAll (small)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll
// spec: https://github.com/tc39/proposal-string-replace-all
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return 'q=query+string+parameters'.replaceAll('+', ' ') === 'q=query string parameters';
}

try {
  if (testCode()) {
    console.log("kangax-es2021/String.prototype.replaceAll.js: OK");
  } else {
    console.log("kangax-es2021/String.prototype.replaceAll.js: failed");
  }
} catch (e) {
  console.log("kangax-es2021/String.prototype.replaceAll.js: exception: " + e);
}
