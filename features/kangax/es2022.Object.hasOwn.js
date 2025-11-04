// ES6: https://github.com/tc39/proposal-accessible-object-hasownproperty
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn
// compat-table: ES2016+ > 2022 features > Object.hasOwn (small) > Basic functionality
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Object.hasOwn({ x: 2 }, "x") === true;
}

try {
  if (testCode()) {
    console.log("es2022.Object.hasOwn.js: OK");
  } else {
    console.log("es2022.Object.hasOwn.js: FAIL");
  }
} catch (e) {
  console.log("es2022.Object.hasOwn.js: FAIL: " + e);
}