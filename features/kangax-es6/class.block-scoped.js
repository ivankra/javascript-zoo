// compat-table: ES6 > functions > class (large) > is block-scoped
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C {}
  var c1 = C;
  {
    class C {}
    var c2 = C;
  }
  return C === c1;
}

try {
  if (testCode()) {
    console.log("kangax-es6/class.block-scoped.js: OK");
  } else {
    console.log("kangax-es6/class.block-scoped.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/class.block-scoped.js: exception: " + e);
}
