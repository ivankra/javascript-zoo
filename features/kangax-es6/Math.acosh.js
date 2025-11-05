// compat-table: ES6 > built-in extensions > Math methods (small) > Math.acosh
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/acosh
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-math
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Math.acosh === "function";
}

try {
  if (testCode()) {
    console.log("kangax-es6/Math.acosh.js: OK");
  } else {
    console.log("kangax-es6/Math.acosh.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Math.acosh.js: exception: " + e);
}
