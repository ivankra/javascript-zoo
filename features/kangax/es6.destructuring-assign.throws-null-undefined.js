// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// compat-table: ES6 > syntax > destructuring, assignment (medium) > throws on null and undefined
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var a,b;
  try {
    ({a} = null);
    return false;
  } catch(e) {
    if (!(e instanceof TypeError))
      return false;
  }
  try {
    ({b} = void undefined);
    return false;
  } catch(e) {
    if (!(e instanceof TypeError))
      return false;
  }
  return true;
}

try {
  if (testCode()) {
    console.log("es6.destructuring-assign.throws-null-undefined.js: OK");
  } else {
    console.log("es6.destructuring-assign.throws-null-undefined.js: FAIL");
  }
} catch (e) {
  console.log("es6.destructuring-assign.throws-null-undefined.js: FAIL: " + e);
}