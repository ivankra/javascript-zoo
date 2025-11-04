// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-array-constructor
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Array_from_an_Array-like_object_(arguments)
// compat-table: ES6 > built-in extensions > Array static methods (medium) > Array.from, array-like objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Array.from({ 0: "foo", 1: "bar", length: 2 }) + '' === "foo,bar";
}

try {
  if (testCode()) {
    console.log("es6.Array.from.array-like.js: OK");
  } else {
    console.log("es6.Array.from.array-like.js: FAIL");
  }
} catch (e) {
  console.log("es6.Array.from.array-like.js: FAIL: " + e);
}