// compat-table: ES6 > functions > super (medium) > super() invokes the correct constructor
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-super-keyword
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // checks that super() is *not* a synonym of super.constructor()
  var passed;
  class B {
      constructor() {
          passed = true;
      }
  };
  B.prototype.constructor = function () {
      passed = false;
  };
  class C extends B { };
  new C;
  return passed;
}

try {
  if (testCode()) {
    console.log("kangax-es6/super.correct-constructor.js: OK");
  } else {
    console.log("kangax-es6/super.correct-constructor.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/super.correct-constructor.js: exception: " + e);
}
