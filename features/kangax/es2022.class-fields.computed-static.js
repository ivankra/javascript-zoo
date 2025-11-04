// ES6: https://github.com/tc39/proposal-static-class-features/
// compat-table: ES2016+ > 2022 features > static class fields (medium) > computed static class fields
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C {
    static ['x'] = 42;
  }
  return C.x === 42;
}

try {
  if (testCode()) {
    console.log("es2022.class-fields.computed-static.js: OK");
  } else {
    console.log("es2022.class-fields.computed-static.js: FAIL");
  }
} catch (e) {
  console.log("es2022.class-fields.computed-static.js: FAIL: " + e);
}