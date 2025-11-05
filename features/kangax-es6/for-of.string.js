// compat-table: ES6 > syntax > for..of loops (large) > with strings
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-for-in-and-for-of-statements
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var str = "";
  for (var item of "foo")
    str += item;
  return str === "foo";
}

try {
  if (testCode()) {
    console.log("kangax-es6/for-of.string.js: OK");
  } else {
    console.log("kangax-es6/for-of.string.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/for-of.string.js: exception: " + e);
}
