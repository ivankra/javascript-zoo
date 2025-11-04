// ES6: https://github.com/tc39/proposal-regexp-legacy-features
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastMatch
// compat-table: ES Next > Stage 3 > Legacy RegExp features in JavaScript (small) > RegExp "lastMatch"
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var re = /\w/;
  re.exec('x');
  return RegExp.lastMatch === 'x';
}

try {
  if (testCode()) {
    console.log("esnext.RegExp.lastMatch.js: OK");
  } else {
    console.log("esnext.RegExp.lastMatch.js: FAIL");
  }
} catch (e) {
  console.log("esnext.RegExp.lastMatch.js: FAIL: " + e);
}