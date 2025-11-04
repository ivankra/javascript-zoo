// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-math
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot
// compat-table: ES6 > built-in extensions > Math methods (small) > Math.hypot
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Math.hypot() === 0 &&
    Math.hypot(1) === 1 &&
    Math.hypot(9, 12, 20) === 25 &&
    Math.hypot(27, 36, 60, 100) === 125;
}

try {
  if (testCode()) {
    console.log("es6.Math.hypot.js: OK");
  } else {
    console.log("es6.Math.hypot.js: FAIL");
  }
} catch (e) {
  console.log("es6.Math.hypot.js: FAIL: " + e);
}