// compat-table: ES6 > functions > class (large) > static accessor properties
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var baz = false;
  class C {
    static get foo() { return "foo"; }
    static set bar(x) { baz = x; }
  }
  C.bar = true;
  return C.foo === "foo" && baz;
}

try {
  if (testCode()) {
    console.log("kangax-es6/class.static-accessor-properties.js: OK");
  } else {
    console.log("kangax-es6/class.static-accessor-properties.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/class.static-accessor-properties.js: exception: " + e);
}
