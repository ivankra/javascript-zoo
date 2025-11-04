// ES6: https://tc39.github.io/ecma262/#sec-string.prototype.padend
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
// compat-table: ES2016+ > 2017 features > String padding (small) > String.prototype.padEnd
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return 'hello'.padEnd(10) === 'hello     '
    && 'hello'.padEnd(10, '1234') === 'hello12341'
    && 'hello'.padEnd() === 'hello'
    && 'hello'.padEnd(6, '123') === 'hello1'
    && 'hello'.padEnd(3) === 'hello'
    && 'hello'.padEnd(3, '123') === 'hello';
}

try {
  if (testCode()) {
    console.log("es2017.String.prototype.padEnd.js: OK");
  } else {
    console.log("es2017.String.prototype.padEnd.js: FAIL");
  }
} catch (e) {
  console.log("es2017.String.prototype.padEnd.js: FAIL: " + e);
}