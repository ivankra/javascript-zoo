// ES6: https://github.com/tc39/proposal-private-methods
// compat-table: ES2016+ > 2022 features > private class methods (medium) > private accessor properties
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var y = false;
  class C {
    get #x() { return 42; }
    set #x(x) { y = x; }
    x() {
      this.#x = true;
      return this.#x;
    }
  }
  return new C().x() === 42 && y;
}

try {
  if (testCode()) {
    console.log("es2022.class-methods.private-accessor.js: OK");
  } else {
    console.log("es2022.class-methods.private-accessor.js: FAIL");
  }
} catch (e) {
  console.log("es2022.class-methods.private-accessor.js: FAIL: " + e);
}