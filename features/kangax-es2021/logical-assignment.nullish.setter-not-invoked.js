// compat-table: ES2016+ > 2021 features > Logical Assignment (small) > ??= setter not unecessarily invoked
// spec: https://github.com/tc39/proposal-logical-assignment/
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  let i = 1;
  var obj = { get x() { return 1 }, set x(n) { i++; } };
  obj.x ??= 2;
  return i === 1;
}

try {
  if (testCode()) {
    console.log("kangax-es2021/logical-assignment.nullish.setter-not-invoked.js: OK");
  } else {
    console.log("kangax-es2021/logical-assignment.nullish.setter-not-invoked.js: failed");
  }
} catch (e) {
  console.log("kangax-es2021/logical-assignment.nullish.setter-not-invoked.js: exception: " + e);
}
