// ES6: https://github.com/tc39/proposal-optional-chaining
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
// compat-table: ES2016+ > 2020 features > optional chaining operator (?.) (medium) > spread parameters after optional chaining
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var fn = null;
  var n = null;
  var o = {};

  return fn?.(...[], 1) === void undefined && fn?.(...[], ...[]) === void undefined && o.method?.(...[], 1) === void undefined && n?.method(...[], 1) === void undefined;
}

try {
  if (testCode()) {
    console.log("es2020.optional-chaining.spread-params.js: OK");
  } else {
    console.log("es2020.optional-chaining.spread-params.js: FAIL");
  }
} catch (e) {
  console.log("es2020.optional-chaining.spread-params.js: FAIL: " + e);
}