// compat-table: ES2016+ > 2019 misc > JSON superset (small) > PARAGRAPH SEPARATOR can appear in string literals
// spec: https://github.com/tc39/proposal-json-superset
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return eval("'\u2029'") === "\u2029";
}

try {
  if (testCode()) {
    console.log("kangax-es2019/misc.JSON-superset.paragraph-separator.js: OK");
  } else {
    console.log("kangax-es2019/misc.JSON-superset.paragraph-separator.js: failed");
  }
} catch (e) {
  console.log("kangax-es2019/misc.JSON-superset.paragraph-separator.js: exception: " + e);
}
