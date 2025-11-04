// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-math
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround
// compat-table: ES6 > built-in extensions > Math methods (small) > Math.fround
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Math.fround === "function";
}

try {
  if (testCode()) {
    console.log("es6.Math.fround.js: OK");
  } else {
    console.log("es6.Math.fround.js: FAIL");
  }
} catch (e) {
  console.log("es6.Math.fround.js: FAIL: " + e);
}