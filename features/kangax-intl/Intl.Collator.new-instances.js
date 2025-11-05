// compat-table: ES Intl > Intl.Collator > creates new Collator instances
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator
// spec: http://www.ecma-international.org/ecma-402/1.0/#sec-10.1.3.1
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return new Intl.Collator() instanceof Intl.Collator;
}

try {
  if (testCode()) {
    console.log("kangax-intl/Intl.Collator.new-instances.js: OK");
  } else {
    console.log("kangax-intl/Intl.Collator.new-instances.js: failed");
  }
} catch (e) {
  console.log("kangax-intl/Intl.Collator.new-instances.js: exception: " + e);
}
