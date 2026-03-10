// compat-table: ES6 > misc > Updated identifier syntax (small) > var 𐋀;
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-names-and-keywords
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var 𐋀;
  return true;
}

try {
  if (testCode()) {
    console.log("compat-table/es6/misc.identifier-syntax.var-2.js: OK");
  } else {
    console.log("compat-table/es6/misc.identifier-syntax.var-2.js: failed");
  }
} catch (e) {
  console.log("compat-table/es6/misc.identifier-syntax.var-2.js: exception: " + e);
}
