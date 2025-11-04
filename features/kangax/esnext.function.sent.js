// ES6: https://github.com/tc39/proposal-function.sent
// compat-table: ES Next > Stage 2 > Generator function.sent Meta Property (small)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var result;
  function* generator() {
    result = function.sent;
  }
  var iter = generator();
  iter.next('tromple');
  return result === 'tromple';
}

try {
  if (testCode()) {
    console.log("esnext.function.sent.js: OK");
  } else {
    console.log("esnext.function.sent.js: FAIL");
  }
} catch (e) {
  console.log("esnext.function.sent.js: FAIL: " + e);
}