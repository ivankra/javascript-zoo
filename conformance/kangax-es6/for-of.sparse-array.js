// compat-table: ES6 > syntax > for..of loops (large) > with sparse arrays
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-for-in-and-for-of-statements
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var arr = [,,];
  var count = 0;
  for (var item of arr)
    count += (item === void undefined);
  return count === 2;
}

try {
  if (testCode()) {
    console.log("kangax-es6/for-of.sparse-array.js: OK");
  } else {
    console.log("kangax-es6/for-of.sparse-array.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/for-of.sparse-array.js: exception: " + e);
}
