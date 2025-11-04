// ES6: https://github.com/tc39/proposal-duplicate-named-capturing-groups
// compat-table: ES2016+ > 2025 features > Duplicate named capturing groups (tiny)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return /(?<year>[0-9]{4})-[0-9]{2}|[0-9]{2}-(?<year>[0-9]{4})/.test("12-1995");
}

try {
  if (testCode()) {
    console.log("es2025.regex.duplicate-named-groups.js: OK");
  } else {
    console.log("es2025.regex.duplicate-named-groups.js: FAIL");
  }
} catch (e) {
  console.log("es2025.regex.duplicate-named-groups.js: FAIL: " + e);
}