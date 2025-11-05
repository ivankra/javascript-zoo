// compat-table: ES2016+ > 2021 features > Logical Assignment (small) > ||= short-circuiting behaviour
// spec: https://github.com/tc39/proposal-logical-assignment/
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  let a = 1;
  let i = 1;
  a ||= ++i;
  return a === 1 && i === 1;
}

try {
  if (testCode()) {
    console.log("kangax-es2021/logical-assignment.or.short-circuit.js: OK");
  } else {
    console.log("kangax-es2021/logical-assignment.or.short-circuit.js: failed");
  }
} catch (e) {
  console.log("kangax-es2021/logical-assignment.or.short-circuit.js: exception: " + e);
}
