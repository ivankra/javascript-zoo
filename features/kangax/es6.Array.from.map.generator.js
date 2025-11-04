// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-array-constructor
// compat-table: ES6 > built-in extensions > Array static methods (medium) > Array.from map function, generator instances
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var iterable = (function*(){ yield "foo"; yield "bar"; yield "bal"; }());
  return Array.from(iterable, function(e, i) {
    return e + this.baz + i;
  }, { baz: "d" }) + '' === "food0,bard1,bald2";
}

try {
  if (testCode()) {
    console.log("es6.Array.from.map.generator.js: OK");
  } else {
    console.log("es6.Array.from.map.generator.js: FAIL");
  }
} catch (e) {
  console.log("es6.Array.from.map.generator.js: FAIL: " + e);
}