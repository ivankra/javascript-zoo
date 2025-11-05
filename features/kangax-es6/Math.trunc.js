// compat-table: ES6 > built-in extensions > Math methods (small) > Math.trunc
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-math
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Math.trunc === "function";
}

try {
  if (testCode()) {
    console.log("kangax-es6/Math.trunc.js: OK");
  } else {
    console.log("kangax-es6/Math.trunc.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Math.trunc.js: exception: " + e);
}
