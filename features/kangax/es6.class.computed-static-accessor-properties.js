// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// compat-table: ES6 > functions > class (large) > computed static accessor properties
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var garply = "foo", grault = "bar", baz = false;
  class C {
    static get [garply]() { return "foo"; }
    static set [grault](x) { baz = x; }
  }
  C.bar = true;
  return C.foo === "foo" && baz;
}

try {
  if (testCode()) {
    console.log("es6.class.computed-static-accessor-properties.js: OK");
  } else {
    console.log("es6.class.computed-static-accessor-properties.js: FAIL");
  }
} catch (e) {
  console.log("es6.class.computed-static-accessor-properties.js: FAIL: " + e);
}