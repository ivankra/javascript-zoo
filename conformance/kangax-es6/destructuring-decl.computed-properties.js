// compat-table: ES6 > syntax > destructuring, declarations (medium) > computed properties
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var qux = "corge";
  var { [qux]: grault } = { corge: "garply" };
  return grault === "garply";
}

try {
  if (testCode()) {
    console.log("kangax-es6/destructuring-decl.computed-properties.js: OK");
  } else {
    console.log("kangax-es6/destructuring-decl.computed-properties.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/destructuring-decl.computed-properties.js: exception: " + e);
}
