// ES6: https://github.com/tc39/proposal-optional-chaining
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
// compat-table: ES2016+ > 2020 features > optional chaining operator (?.) (medium) > optional method call
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var foo = { baz: function () { return this.value; }, value: 42 };
  var bar = null;
  return foo?.baz() === 42 && bar?.baz() === void undefined;
}

try {
  if (testCode()) {
    console.log("es2020.optional-chaining.method-call.js: OK");
  } else {
    console.log("es2020.optional-chaining.method-call.js: FAIL");
  }
} catch (e) {
  console.log("es2020.optional-chaining.method-call.js: FAIL: " + e);
}