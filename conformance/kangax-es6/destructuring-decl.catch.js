// compat-table: ES6 > syntax > destructuring, declarations (medium) > in catch heads
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  try {
    throw [1,2];
  } catch([i,j]) {
    try {
      throw { k: 3, l: 4 };
    } catch({k, l}) {
      return i === 1 && j === 2 && k === 3 && l === 4;
    }
  }
}

try {
  if (testCode()) {
    console.log("kangax-es6/destructuring-decl.catch.js: OK");
  } else {
    console.log("kangax-es6/destructuring-decl.catch.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/destructuring-decl.catch.js: exception: " + e);
}
