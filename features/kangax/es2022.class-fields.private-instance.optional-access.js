// ES6: https://github.com/tc39/proposal-class-fields
// compat-table: ES2016+ > 2022 features > instance class fields (medium) > optional private instance class fields access
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C {
    #x = 42;
    x(o = this) {
      return o?.#x;
    }
  }
  return new C().x() === 42 && new C().x(null) === void undefined;
}

try {
  if (testCode()) {
    console.log("es2022.class-fields.private-instance.optional-access.js: OK");
  } else {
    console.log("es2022.class-fields.private-instance.optional-access.js: FAIL");
  }
} catch (e) {
  console.log("es2022.class-fields.private-instance.optional-access.js: FAIL: " + e);
}