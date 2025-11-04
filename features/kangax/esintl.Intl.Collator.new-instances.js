// ES6: http://www.ecma-international.org/ecma-402/1.0/#sec-10.1.3.1
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator
// compat-table: ES Intl > Intl.Collator > creates new Collator instances
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return new Intl.Collator() instanceof Intl.Collator;
}

try {
  if (testCode()) {
    console.log("esintl.Intl.Collator.new-instances.js: OK");
  } else {
    console.log("esintl.Intl.Collator.new-instances.js: FAIL");
  }
} catch (e) {
  console.log("esintl.Intl.Collator.new-instances.js: FAIL: " + e);
}