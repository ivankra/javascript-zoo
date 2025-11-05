// compat-table: ES6 > syntax > destructuring, parameters (medium) > throws on null and undefined
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  try {
    (function({a}){}(null));
    return false;
  } catch(e) {}
  try {
    (function({b}){}(undefined));
    return false;
  } catch(e) {}
  return true;
}

try {
  if (testCode()) {
    console.log("kangax-es6/destructuring-params.throws-null-undefined.js: OK");
  } else {
    console.log("kangax-es6/destructuring-params.throws-null-undefined.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/destructuring-params.throws-null-undefined.js: exception: " + e);
}
