// compat-table: ES6 > syntax > destructuring, declarations (medium) > defaults, let temporal dead zone
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var {a, b = 2} = {a:1};
  try {
    eval("let {c = c} = {};");
    return false;
  } catch(e){}
  try {
    eval("let {c = d, d} = {d:1};");
    return false;
  } catch(e){}
  return a === 1 && b === 2;
}

try {
  if (testCode()) {
    console.log("kangax-es6/destructuring-decl.defaults-tdz.js: OK");
  } else {
    console.log("kangax-es6/destructuring-decl.defaults-tdz.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/destructuring-decl.defaults-tdz.js: exception: " + e);
}
