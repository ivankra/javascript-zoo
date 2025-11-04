// ES6: https://github.com/tc39/proposal-logical-assignment/
// compat-table: ES2016+ > 2021 features > Logical Assignment (small) > ||= setter not unecessarily invoked
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  let i = 1;
  var obj = { get x() { return 1 }, set x(n) { i++; } };
  obj.x ||= 2;
  return i === 1;
}

try {
  if (testCode()) {
    console.log("es2021.logical-assignment.or.setter-not-invoked.js: OK");
  } else {
    console.log("es2021.logical-assignment.or.setter-not-invoked.js: FAIL");
  }
} catch (e) {
  console.log("es2021.logical-assignment.or.setter-not-invoked.js: FAIL: " + e);
}