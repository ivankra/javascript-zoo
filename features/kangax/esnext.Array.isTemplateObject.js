// ES6: https://github.com/tc39/proposal-array-is-template-object
// compat-table: ES Next > Stage 2 > Array.isTemplateObject (small)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return !Array.isTemplateObject([])
    && Array.isTemplateObject((it => it)`a${1}c`);
}

try {
  if (testCode()) {
    console.log("esnext.Array.isTemplateObject.js: OK");
  } else {
    console.log("esnext.Array.isTemplateObject.js: FAIL");
  }
} catch (e) {
  console.log("esnext.Array.isTemplateObject.js: FAIL: " + e);
}