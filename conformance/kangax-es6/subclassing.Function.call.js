// compat-table: ES6 > subclassing > Function is subclassable (tiny) > can be called
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-function-constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C extends Function {}
  var c = new C("return 'foo';");
  return c() === 'foo';
}

try {
  if (testCode()) {
    console.log("kangax-es6/subclassing.Function.call.js: OK");
  } else {
    console.log("kangax-es6/subclassing.Function.call.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/subclassing.Function.call.js: exception: " + e);
}
