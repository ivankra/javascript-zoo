// compat-table: ES Next > Stage 2 > Array.isTemplateObject (small)
// spec: https://github.com/tc39/proposal-array-is-template-object
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
    console.log("kangax-next/Array.isTemplateObject.js: OK");
  } else {
    console.log("kangax-next/Array.isTemplateObject.js: failed");
  }
} catch (e) {
  console.log("kangax-next/Array.isTemplateObject.js: exception: " + e);
}
