// ES6: http://www.ecma-international.org/ecma-402/1.0/#sec-10.3.2
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator/compare
// compat-table: ES Intl > Intl.Collator.prototype.compare > exists on Collator prototype
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Intl.Collator().compare === 'function';
}

try {
  if (testCode()) {
    console.log("esintl.Intl.Collator.prototype.compare.js: OK");
  } else {
    console.log("esintl.Intl.Collator.prototype.compare.js: FAIL");
  }
} catch (e) {
  console.log("esintl.Intl.Collator.prototype.compare.js: FAIL: " + e);
}