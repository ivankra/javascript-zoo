// compat-table: ES2016+ > 2017 features > String padding (small) > String.prototype.padStart
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
// spec: https://tc39.github.io/ecma262/#sec-string.prototype.padstart
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return 'hello'.padStart(10) === '     hello'
    && 'hello'.padStart(10, '1234') === '12341hello'
    && 'hello'.padStart() === 'hello'
    && 'hello'.padStart(6, '123') === '1hello'
    && 'hello'.padStart(3) === 'hello'
    && 'hello'.padStart(3, '123') === 'hello';
}

try {
  if (testCode()) {
    console.log("kangax-es2017/String.prototype.padStart.js: OK");
  } else {
    console.log("kangax-es2017/String.prototype.padStart.js: failed");
  }
} catch (e) {
  console.log("kangax-es2017/String.prototype.padStart.js: exception: " + e);
}
