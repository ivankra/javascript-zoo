// compat-table: ES2016+ > 2022 features > Error.cause property (small) > Error has cause
// spec: https://github.com/tc39/proposal-error-cause
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var error = new Error('error', { cause: 'cause' })
  return error.hasOwnProperty('cause') && error.cause === 'cause';
}

try {
  if (testCode()) {
    console.log("kangax-es2022/Error.cause.Error.js: OK");
  } else {
    console.log("kangax-es2022/Error.cause.Error.js: failed");
  }
} catch (e) {
  console.log("kangax-es2022/Error.cause.Error.js: exception: " + e);
}
