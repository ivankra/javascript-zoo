// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-reflection
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect
// compat-table: ES6 > built-ins > Reflect (small) > Reflect.construct sets new.target meta-property
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Reflect.construct(function(a, b, c) {
    if (new.target === Object) {
      this.qux = a + b + c;
    }
  }, ["foo", "bar", "baz"], Object).qux === "foobarbaz";
}

try {
  if (testCode()) {
    console.log("es6.Reflect.construct.new-target.js: OK");
  } else {
    console.log("es6.Reflect.construct.new-target.js: FAIL");
  }
} catch (e) {
  console.log("es6.Reflect.construct.new-target.js: FAIL: " + e);
}