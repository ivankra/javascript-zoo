// compat-table: ES2016+ > 2020 features > optional chaining operator (?.) (medium) > optional method call
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
// spec: https://github.com/tc39/proposal-optional-chaining
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
    console.log("kangax-es2020/optional-chaining.method-call.js: OK");
  } else {
    console.log("kangax-es2020/optional-chaining.method-call.js: failed");
  }
} catch (e) {
  console.log("kangax-es2020/optional-chaining.method-call.js: exception: " + e);
}
