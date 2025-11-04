// ES6: https://github.com/tc39/proposal-optional-chaining
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
// compat-table: ES2016+ > 2020 features > optional chaining operator (?.) (medium) > optional function call
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var foo = { baz: function () { return 42; } };
  var bar = {};
  function baz() { return 42; };
  var n;
  return foo.baz?.() === 42 && bar.baz?.() === void undefined && baz?.() === 42 && n?.() === void undefined;
}

try {
  if (testCode()) {
    console.log("es2020.optional-chaining.function-call.js: OK");
  } else {
    console.log("es2020.optional-chaining.function-call.js: FAIL");
  }
} catch (e) {
  console.log("es2020.optional-chaining.function-call.js: FAIL: " + e);
}