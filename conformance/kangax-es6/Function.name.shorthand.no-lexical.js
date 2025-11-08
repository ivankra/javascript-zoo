// compat-table: ES6 > built-in extensions > function "name" property (small) > shorthand methods (no lexical binding)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-setfunctionname
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var f = "foo";
  return ({f() { return f; }}).f() === "foo";
}

try {
  if (testCode()) {
    console.log("kangax-es6/Function.name.shorthand.no-lexical.js: OK");
  } else {
    console.log("kangax-es6/Function.name.shorthand.no-lexical.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Function.name.shorthand.no-lexical.js: exception: " + e);
}
