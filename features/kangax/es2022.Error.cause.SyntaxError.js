// ES6: https://github.com/tc39/proposal-error-cause
// compat-table: ES2016+ > 2022 features > Error.cause property (small) > SyntaxError has cause
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var error = new SyntaxError('error', { cause: 'cause' })
  return error.hasOwnProperty('cause') && error.cause === 'cause';
}

try {
  if (testCode()) {
    console.log("es2022.Error.cause.SyntaxError.js: OK");
  } else {
    console.log("es2022.Error.cause.SyntaxError.js: FAIL");
  }
} catch (e) {
  console.log("es2022.Error.cause.SyntaxError.js: FAIL: " + e);
}