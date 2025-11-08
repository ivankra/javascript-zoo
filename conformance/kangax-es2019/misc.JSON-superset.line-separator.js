// compat-table: ES2016+ > 2019 misc > JSON superset (small) > LINE SEPARATOR can appear in string literals
// spec: https://github.com/tc39/proposal-json-superset
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return eval("'\u2028'") === "\u2028";
}

try {
  if (testCode()) {
    console.log("kangax-es2019/misc.JSON-superset.line-separator.js: OK");
  } else {
    console.log("kangax-es2019/misc.JSON-superset.line-separator.js: failed");
  }
} catch (e) {
  console.log("kangax-es2019/misc.JSON-superset.line-separator.js: exception: " + e);
}
