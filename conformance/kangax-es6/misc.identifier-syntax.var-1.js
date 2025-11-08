// compat-table: ES6 > misc > Updated identifier syntax (small) > var ⸯ;
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-names-and-keywords
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  try {
    eval('var ⸯ');
  } catch(e) {
    return true;
  }
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.identifier-syntax.var-1.js: OK");
  } else {
    console.log("kangax-es6/misc.identifier-syntax.var-1.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.identifier-syntax.var-1.js: exception: " + e);
}
