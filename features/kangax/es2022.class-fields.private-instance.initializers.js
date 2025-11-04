// ES6: https://github.com/tc39/proposal-class-fields
// compat-table: ES2016+ > 2022 features > instance class fields (medium) > private instance class fields initializers
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C {
    #x = 42;
    x() {
      return this.#x;
    }
  }
  return new C().x() === 42;
}

try {
  if (testCode()) {
    console.log("es2022.class-fields.private-instance.initializers.js: OK");
  } else {
    console.log("es2022.class-fields.private-instance.initializers.js: FAIL");
  }
} catch (e) {
  console.log("es2022.class-fields.private-instance.initializers.js: FAIL: " + e);
}