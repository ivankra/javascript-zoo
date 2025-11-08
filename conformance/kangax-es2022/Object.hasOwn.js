// compat-table: ES2016+ > 2022 features > Object.hasOwn (small) > Basic functionality
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn
// spec: https://github.com/tc39/proposal-accessible-object-hasownproperty
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Object.hasOwn({ x: 2 }, "x") === true;
}

try {
  if (testCode()) {
    console.log("kangax-es2022/Object.hasOwn.js: OK");
  } else {
    console.log("kangax-es2022/Object.hasOwn.js: failed");
  }
} catch (e) {
  console.log("kangax-es2022/Object.hasOwn.js: exception: " + e);
}
