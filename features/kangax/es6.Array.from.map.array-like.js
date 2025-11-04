// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-array-constructor
// compat-table: ES6 > built-in extensions > Array static methods (medium) > Array.from map function, array-like objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Array.from({ 0: "foo", 1: "bar", length: 2 }, function(e, i) {
    return e + this.baz + i;
  }, { baz: "d" }) + '' === "food0,bard1";
}

try {
  if (testCode()) {
    console.log("es6.Array.from.map.array-like.js: OK");
  } else {
    console.log("es6.Array.from.map.array-like.js: FAIL");
  }
} catch (e) {
  console.log("es6.Array.from.map.array-like.js: FAIL: " + e);
}