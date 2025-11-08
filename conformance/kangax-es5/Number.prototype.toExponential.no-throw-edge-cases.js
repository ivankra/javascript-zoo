// compat-table: ES5 > Number methods (small) > Number.prototype.toExponential does not throw on edge cases
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  try {
    NaN.toExponential(Infinity);
    Infinity.toExponential(Infinity);
    return true;
  } catch (e) {
    return false;
  }
}

try {
  if (testCode()) {
    console.log("kangax-es5/Number.prototype.toExponential.no-throw-edge-cases.js: OK");
  } else {
    console.log("kangax-es5/Number.prototype.toExponential.no-throw-edge-cases.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/Number.prototype.toExponential.no-throw-edge-cases.js: exception: " + e);
}
