// compat-table: ES5 > Miscellaneous (medium) > Function.prototype.apply permits array-likes
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  try {
    return (function(a,b) { return a === 1 && b === 2; }).apply({}, {0:1, 1:2, length:2});
  } catch (e) {
    return false;
  }
}

try {
  if (testCode()) {
    console.log("kangax-es5/misc.Function.apply.array-likes.js: OK");
  } else {
    console.log("kangax-es5/misc.Function.apply.array-likes.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/misc.Function.apply.array-likes.js: exception: " + e);
}
