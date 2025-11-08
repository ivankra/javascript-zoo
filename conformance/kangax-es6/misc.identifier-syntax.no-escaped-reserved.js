// compat-table: ES6 > misc > Updated identifier syntax (small) > no escaped reserved words as identifiers
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-names-and-keywords
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
    console.log("kangax-es6/misc.identifier-syntax.no-escaped-reserved.js: OK");
  } else {
    console.log("kangax-es6/misc.identifier-syntax.no-escaped-reserved.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.identifier-syntax.no-escaped-reserved.js: exception: " + e);
}
