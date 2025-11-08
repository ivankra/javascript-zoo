// compat-table: ES Next > Stage 3 > Legacy RegExp features in JavaScript (small) > RegExp "lastMatch"
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastMatch
// spec: https://github.com/tc39/proposal-regexp-legacy-features
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
    console.log("kangax-next/RegExp.lastMatch.js: OK");
  } else {
    console.log("kangax-next/RegExp.lastMatch.js: failed");
  }
} catch (e) {
  console.log("kangax-next/RegExp.lastMatch.js: exception: " + e);
}
