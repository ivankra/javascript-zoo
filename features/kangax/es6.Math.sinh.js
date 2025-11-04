// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-math
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sinh
// compat-table: ES6 > built-in extensions > Math methods (small) > Math.sinh
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Math.sinh === "function";
}

try {
  if (testCode()) {
    console.log("es6.Math.sinh.js: OK");
  } else {
    console.log("es6.Math.sinh.js: FAIL");
  }
} catch (e) {
  console.log("es6.Math.sinh.js: FAIL: " + e);
}