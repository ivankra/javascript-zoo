// compat-table: ES6 > functions > class (large) > implicit strict mode
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C {
    static method() { return this === void undefined; }
  }
  return (0,C.method)();
}

try {
  if (testCode()) {
    console.log("kangax-es6/class.implicit-strict.js: OK");
  } else {
    console.log("kangax-es6/class.implicit-strict.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/class.implicit-strict.js: exception: " + e);
}
