// ES6: https://github.com/tc39/proposal-Symbol-description
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/description
// compat-table: ES2016+ > 2019 features > Symbol.prototype.description (small) > undefined description
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Symbol.prototype.hasOwnProperty('description')
    && Symbol().description === void undefined;
}

try {
  if (testCode()) {
    console.log("es2019.Symbol.prototype.description.undefined.js: OK");
  } else {
    console.log("es2019.Symbol.prototype.description.undefined.js: FAIL");
  }
} catch (e) {
  console.log("es2019.Symbol.prototype.description.undefined.js: FAIL: " + e);
}