// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-math
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/expm1
// compat-table: ES6 > built-in extensions > Math methods (small) > Math.expm1
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Math.expm1 === "function";
}

try {
  if (testCode()) {
    console.log("es6.Math.expm1.js: OK");
  } else {
    console.log("es6.Math.expm1.js: FAIL");
  }
} catch (e) {
  console.log("es6.Math.expm1.js: FAIL: " + e);
}