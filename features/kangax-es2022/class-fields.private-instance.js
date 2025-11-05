// compat-table: ES2016+ > 2022 features > instance class fields (medium) > private instance class fields basic support
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_elements#Private_instance_fields
// spec: https://github.com/tc39/proposal-class-fields
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C {
    #x;
    constructor(x) {
      this.#x = x;
    }
    x() {
      return this.#x;
    }
  }
  return new C(42).x() === 42;
}

try {
  if (testCode()) {
    console.log("kangax-es2022/class-fields.private-instance.js: OK");
  } else {
    console.log("kangax-es2022/class-fields.private-instance.js: failed");
  }
} catch (e) {
  console.log("kangax-es2022/class-fields.private-instance.js: exception: " + e);
}
