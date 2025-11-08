// compat-table: ES6 > built-in extensions > Math methods (small) > Math.log10
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log10
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-math
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Math.log10 === "function";
}

try {
  if (testCode()) {
    console.log("kangax-es6/Math.log10.js: OK");
  } else {
    console.log("kangax-es6/Math.log10.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Math.log10.js: exception: " + e);
}
