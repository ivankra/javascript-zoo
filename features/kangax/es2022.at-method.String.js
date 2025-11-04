// ES6: https://github.com/tc39/proposal-relative-indexing-method/
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/at
// compat-table: ES2016+ > 2022 features > .at() method on the built-in indexables (tiny) > String.prototype.at()
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var str = 'abc';
  return str.at(0) === 'a'
    && str.at(-3) === 'a'
    && str.at(1) === 'b'
    && str.at(-2) === 'b'
    && str.at(2) === 'c'
    && str.at(-1) === 'c'
    && str.at(3) === undefined
    && str.at(-4) === undefined;
}

try {
  if (testCode()) {
    console.log("es2022.at-method.String.js: OK");
  } else {
    console.log("es2022.at-method.String.js: FAIL");
  }
} catch (e) {
  console.log("es2022.at-method.String.js: FAIL: " + e);
}