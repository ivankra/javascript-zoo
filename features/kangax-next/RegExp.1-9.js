// compat-table: ES Next > Stage 3 > Legacy RegExp features in JavaScript (small) > RegExp.$1-$9
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/n
// spec: https://github.com/tc39/proposal-regexp-legacy-features
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  for (var i = 1; i < 10; i++) {
    if (!(('$' + i) in RegExp)) return false;
  }
  return true;
}

try {
  if (testCode()) {
    console.log("kangax-next/RegExp.1-9.js: OK");
  } else {
    console.log("kangax-next/RegExp.1-9.js: failed");
  }
} catch (e) {
  console.log("kangax-next/RegExp.1-9.js: exception: " + e);
}
