// ES6: https://github.com/tc39/proposal-json-superset
// compat-table: ES2016+ > 2019 misc > JSON superset (small) > LINE SEPARATOR can appear in string literals
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return eval("'\u2028'") === "\u2028";
}

try {
  if (testCode()) {
    console.log("es2019.misc.JSON-superset.line-separator.js: OK");
  } else {
    console.log("es2019.misc.JSON-superset.line-separator.js: FAIL");
  }
} catch (e) {
  console.log("es2019.misc.JSON-superset.line-separator.js: FAIL: " + e);
}