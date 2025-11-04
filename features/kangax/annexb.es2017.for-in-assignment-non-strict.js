// ES6: https://tc39.github.io/ecma262/#sec-initializers-in-forin-statement-heads
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in#Compatibility_Initializer_expressions_in_strict_mode
// compat-table: ES2016+ > 2017 annex b > assignments allowed in for-in head in non-strict mode (tiny)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  for (var i = 0 in {}) {}
  return i === 0;
}

try {
  if (testCode()) {
    console.log("annexb.es2017.for-in-assignment-non-strict.js: OK");
  } else {
    console.log("annexb.es2017.for-in-assignment-non-strict.js: FAIL");
  }
} catch (e) {
  console.log("annexb.es2017.for-in-assignment-non-strict.js: FAIL: " + e);
}