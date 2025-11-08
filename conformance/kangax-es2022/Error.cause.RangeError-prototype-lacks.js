// compat-table: ES2016+ > 2022 features > Error.cause property (small) > RangeError.prototype lacks cause
// spec: https://github.com/tc39/proposal-error-cause
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return !('cause' in RangeError.prototype);
}

try {
  if (testCode()) {
    console.log("kangax-es2022/Error.cause.RangeError-prototype-lacks.js: OK");
  } else {
    console.log("kangax-es2022/Error.cause.RangeError-prototype-lacks.js: failed");
  }
} catch (e) {
  console.log("kangax-es2022/Error.cause.RangeError-prototype-lacks.js: exception: " + e);
}
