// compat-table: ES2016+ > 2019 features > Object.fromEntries (small)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
// spec: https://github.com/tc39/proposal-object-from-entries
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var object = Object.fromEntries(new Map([['foo', 42], ['bar', 23]]));
  return object.foo === 42 && object.bar === 23;
}

try {
  if (testCode()) {
    console.log("kangax-es2019/Object.fromEntries.js: OK");
  } else {
    console.log("kangax-es2019/Object.fromEntries.js: failed");
  }
} catch (e) {
  console.log("kangax-es2019/Object.fromEntries.js: exception: " + e);
}
