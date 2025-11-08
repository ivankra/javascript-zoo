// compat-table: ES2016+ > 2025 features > RegExp Pattern Modifiers (medium) > m flag
// spec: https://github.com/tc39/proposal-regexp-modifiers
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  const regex = /^a|(?m:^b)/;
  return regex.test("a") && regex.test("b") && regex.test("c\nb") && !regex.test("c\na");
}

try {
  if (testCode()) {
    console.log("kangax-es2025/regex.pattern-modifiers.m.js: OK");
  } else {
    console.log("kangax-es2025/regex.pattern-modifiers.m.js: failed");
  }
} catch (e) {
  console.log("kangax-es2025/regex.pattern-modifiers.m.js: exception: " + e);
}
