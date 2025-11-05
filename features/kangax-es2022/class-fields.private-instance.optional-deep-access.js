// compat-table: ES2016+ > 2022 features > instance class fields (medium) > optional deep private instance class fields access
// spec: https://github.com/tc39/proposal-class-fields
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C {
    #x = 42;
    x(o = { p: this }) {
      return o?.p.#x;
    }
  }
  return new C().x() === 42 && new C().x(null) === void undefined;
}

try {
  if (testCode()) {
    console.log("kangax-es2022/class-fields.private-instance.optional-deep-access.js: OK");
  } else {
    console.log("kangax-es2022/class-fields.private-instance.optional-deep-access.js: failed");
  }
} catch (e) {
  console.log("kangax-es2022/class-fields.private-instance.optional-deep-access.js: exception: " + e);
}
