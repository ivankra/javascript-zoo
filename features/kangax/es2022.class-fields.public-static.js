// ES6: https://github.com/tc39/proposal-static-class-features/
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_elements#Public_static_fields
// compat-table: ES2016+ > 2022 features > static class fields (medium) > public static class fields
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C {
    static x = 'x';
  }
  return C.x === 'x';
}

try {
  if (testCode()) {
    console.log("es2022.class-fields.public-static.js: OK");
  } else {
    console.log("es2022.class-fields.public-static.js: FAIL");
  }
} catch (e) {
  console.log("es2022.class-fields.public-static.js: FAIL: " + e);
}