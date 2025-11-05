// compat-table: ES6 > functions > class (large) > accessor properties
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var baz = false;
  class C {
    get foo() { return "foo"; }
    set bar(x) { baz = x; }
  }
  new C().bar = true;
  return new C().foo === "foo" && baz;
}

try {
  if (testCode()) {
    console.log("kangax-es6/class.accessor-properties.js: OK");
  } else {
    console.log("kangax-es6/class.accessor-properties.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/class.accessor-properties.js: exception: " + e);
}
