// compat-table: ES6 > functions > arrow functions (large) > lexical "super" binding in constructors
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-arrow-function-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var received;

  class B {
    constructor (arg) {
      received = arg;
    }
  }
  class C extends B {
    constructor () {
      var callSuper = () => super('foo');
      callSuper();
    }
  }
  return new C instanceof C && received === 'foo'
}

try {
  if (testCode()) {
    console.log("kangax-es6/arrow.lexical-super.constructor.js: OK");
  } else {
    console.log("kangax-es6/arrow.lexical-super.constructor.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/arrow.lexical-super.constructor.js: exception: " + e);
}
