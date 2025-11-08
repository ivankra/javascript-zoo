// compat-table: ES Intl > Intl.Collator > exists on intl object
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator
// spec: http://www.ecma-international.org/ecma-402/1.0/#sec-10
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Intl.Collator === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-intl/Intl.Collator.js: OK");
  } else {
    console.log("kangax-intl/Intl.Collator.js: failed");
  }
} catch (e) {
  console.log("kangax-intl/Intl.Collator.js: exception: " + e);
}
