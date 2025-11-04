// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-math
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log10
// compat-table: ES6 > built-in extensions > Math methods (small) > Math.log10
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Math.log10 === "function";
}

try {
  if (testCode()) {
    console.log("es6.Math.log10.js: OK");
  } else {
    console.log("es6.Math.log10.js: FAIL");
  }
} catch (e) {
  console.log("es6.Math.log10.js: FAIL: " + e);
}