// compat-table: ES2016+ > 2022 features > static class fields (medium) > private static class fields
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_elements#Private_static_fields
// spec: https://github.com/tc39/proposal-static-class-features/
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C {
    static #x = 42;
    x() {
      return C.#x;
    }
  }
  return new C().x() === 42;
}

try {
  if (testCode()) {
    console.log("kangax-es2022/class-fields.private-static.js: OK");
  } else {
    console.log("kangax-es2022/class-fields.private-static.js: failed");
  }
} catch (e) {
  console.log("kangax-es2022/class-fields.private-static.js: exception: " + e);
}
