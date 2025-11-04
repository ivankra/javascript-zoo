// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-names-and-keywords
// compat-table: ES6 > misc > Updated identifier syntax (small) > no escaped reserved words as identifiers
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var \u0061;
  try {
    eval('var v\\u0061r');
  } catch(e) {
    return true;
  }
}

try {
  if (testCode()) {
    console.log("es6.misc.identifier-syntax.no-escaped-reserved.js: OK");
  } else {
    console.log("es6.misc.identifier-syntax.no-escaped-reserved.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.identifier-syntax.no-escaped-reserved.js: FAIL: " + e);
}