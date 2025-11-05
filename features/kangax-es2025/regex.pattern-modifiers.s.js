// compat-table: ES2016+ > 2025 features > RegExp Pattern Modifiers (medium) > s flag
// spec: https://github.com/tc39/proposal-regexp-modifiers
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  const regex = /.(?-s:.)/s;
  return regex.test("\na") && regex.test("aa") && !regex.test("\n\n");
}

try {
  if (testCode()) {
    console.log("kangax-es2025/regex.pattern-modifiers.s.js: OK");
  } else {
    console.log("kangax-es2025/regex.pattern-modifiers.s.js: failed");
  }
} catch (e) {
  console.log("kangax-es2025/regex.pattern-modifiers.s.js: exception: " + e);
}
