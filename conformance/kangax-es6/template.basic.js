// compat-table: ES6 > syntax > template literals (large) > basic functionality
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-template-literals
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
var a = "ba", b = "QUX";
return `foo bar
${a + "z"} ${b.toLowerCase()}` === "foo bar\nbaz qux";
}

try {
  if (testCode()) {
    console.log("kangax-es6/template.basic.js: OK");
  } else {
    console.log("kangax-es6/template.basic.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/template.basic.js: exception: " + e);
}
