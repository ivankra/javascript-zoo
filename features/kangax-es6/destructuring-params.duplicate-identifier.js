// compat-table: ES6 > syntax > destructuring, parameters (medium) > duplicate identifier
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  try {
    eval('var d = function d([d]) { return d };');
    if (d([true]) !== true) return false;
  } catch (e) {
    return !(e instanceof SyntaxError);
  }

  try {
    eval('var f = function f([id, id]) { return id }');
    return false;
  } catch (e) {
    return e instanceof SyntaxError;
  }
}

try {
  if (testCode()) {
    console.log("kangax-es6/destructuring-params.duplicate-identifier.js: OK");
  } else {
    console.log("kangax-es6/destructuring-params.duplicate-identifier.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/destructuring-params.duplicate-identifier.js: exception: " + e);
}
