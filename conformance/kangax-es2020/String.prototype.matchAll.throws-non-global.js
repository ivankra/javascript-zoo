// compat-table: ES2016+ > 2020 features > String.prototype.matchAll (small) > throws on non-global regex
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll
// spec: https://github.com/tc39/String.prototype.matchAll
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  if (typeof String.prototype.matchAll !== 'function') return false;
  try {
    '11a2bb'.matchAll(/(\d)(\D)/);
  } catch (e) {
    return true;
  }
}

try {
  if (testCode()) {
    console.log("kangax-es2020/String.prototype.matchAll.throws-non-global.js: OK");
  } else {
    console.log("kangax-es2020/String.prototype.matchAll.throws-non-global.js: failed");
  }
} catch (e) {
  console.log("kangax-es2020/String.prototype.matchAll.throws-non-global.js: exception: " + e);
}
