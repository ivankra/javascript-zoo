// compat-table: ES2016+ > 2022 features > static class fields (medium) > public static class fields
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_elements#Public_static_fields
// spec: https://github.com/tc39/proposal-static-class-features/
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
    console.log("kangax-es2022/class-fields.public-static.js: OK");
  } else {
    console.log("kangax-es2022/class-fields.public-static.js: failed");
  }
} catch (e) {
  console.log("kangax-es2022/class-fields.public-static.js: exception: " + e);
}
