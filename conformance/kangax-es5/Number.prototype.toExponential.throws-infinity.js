// compat-table: ES5 > Number methods (small) > Number.prototype.toExponential throws on ±Infinity fractionDigits
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  try {
    (1).toExponential(Infinity);
    (1).toExponential(-Infinity);
    return false;
  } catch (e) {
    return true;
  }
}

try {
  if (testCode()) {
    console.log("kangax-es5/Number.prototype.toExponential.throws-infinity.js: OK");
  } else {
    console.log("kangax-es5/Number.prototype.toExponential.throws-infinity.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/Number.prototype.toExponential.throws-infinity.js: exception: " + e);
}
