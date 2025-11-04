// ES6: https://github.com/tc39/proposal-private-methods
// compat-table: ES2016+ > 2022 features > private class methods (medium) > private instance methods
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C {
    #x() { return 42; }
    x() {
      return this.#x();
    }
  }
  return new C().x() === 42;
}

try {
  if (testCode()) {
    console.log("es2022.class-methods.private-instance.js: OK");
  } else {
    console.log("es2022.class-methods.private-instance.js: FAIL");
  }
} catch (e) {
  console.log("es2022.class-methods.private-instance.js: FAIL: " + e);
}