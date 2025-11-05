// compat-table: ES5 > Number methods (small) > Number.prototype.toExponential rounds properly
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return (-6.9e-11).toExponential(4) === '-6.9000e-11' // Edge <= 17
    && (25).toExponential(0) === '3e+1' // FF <= 86
    && (1.255).toExponential(2) === '1.25e+0'; // IE <= 11 && Edge <= 14
}

try {
  if (testCode()) {
    console.log("kangax-es5/Number.prototype.toExponential.rounds-properly.js: OK");
  } else {
    console.log("kangax-es5/Number.prototype.toExponential.rounds-properly.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/Number.prototype.toExponential.rounds-properly.js: exception: " + e);
}
