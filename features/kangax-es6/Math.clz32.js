// compat-table: ES6 > built-in extensions > Math methods (small) > Math.clz32
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-math
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Math.clz32 === "function";
}

try {
  if (testCode()) {
    console.log("kangax-es6/Math.clz32.js: OK");
  } else {
    console.log("kangax-es6/Math.clz32.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Math.clz32.js: exception: " + e);
}
