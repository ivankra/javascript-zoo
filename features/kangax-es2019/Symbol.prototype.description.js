// compat-table: ES2016+ > 2019 features > Symbol.prototype.description (small) > basic
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/description
// spec: https://github.com/tc39/proposal-Symbol-description
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Symbol('foo').description === 'foo';
}

try {
  if (testCode()) {
    console.log("kangax-es2019/Symbol.prototype.description.js: OK");
  } else {
    console.log("kangax-es2019/Symbol.prototype.description.js: failed");
  }
} catch (e) {
  console.log("kangax-es2019/Symbol.prototype.description.js: exception: " + e);
}
