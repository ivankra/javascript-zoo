// compat-table: ES2016+ > 2022 features > Error.cause property (small) > AggregateError.prototype lacks cause
// spec: https://github.com/tc39/proposal-error-cause
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return !('cause' in AggregateError.prototype);
}

try {
  if (testCode()) {
    console.log("kangax-es2022/Error.cause.AggregateError-prototype-lacks.js: OK");
  } else {
    console.log("kangax-es2022/Error.cause.AggregateError-prototype-lacks.js: failed");
  }
} catch (e) {
  console.log("kangax-es2022/Error.cause.AggregateError-prototype-lacks.js: exception: " + e);
}
