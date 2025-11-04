// ES6: https://github.com/tc39/proposal-class-fields
// compat-table: ES2016+ > 2022 features > instance class fields (medium) > computed instance class fields
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C {
    ['x'] = 42;
  }
  return new C().x === 42;
}

try {
  if (testCode()) {
    console.log("es2022.class-fields.computed-instance.js: OK");
  } else {
    console.log("es2022.class-fields.computed-instance.js: FAIL");
  }
} catch (e) {
  console.log("es2022.class-fields.computed-instance.js: FAIL: " + e);
}