// compat-table: ES2016+ > 2022 features > Error.cause property (small) > AggregateError has cause
// spec: https://github.com/tc39/proposal-error-cause
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var error = new AggregateError([], 'error', { cause: 'cause' })
  return error.hasOwnProperty('cause') && error.cause === 'cause';
}

try {
  if (testCode()) {
    console.log("kangax-es2022/Error.cause.AggregateError.js: OK");
  } else {
    console.log("kangax-es2022/Error.cause.AggregateError.js: failed");
  }
} catch (e) {
  console.log("kangax-es2022/Error.cause.AggregateError.js: exception: " + e);
}
