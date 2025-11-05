// compat-table: ES6 > syntax > destructuring, parameters (medium) > nested
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return function([e, {x:f, g}], {h, x:[i]}) {
    return e === 9 && f === 10 && g === void undefined
      && h === 11 && i === 12;
  }([9, {x:10}],{h:11, x:[12]});
}

try {
  if (testCode()) {
    console.log("kangax-es6/destructuring-params.nested.js: OK");
  } else {
    console.log("kangax-es6/destructuring-params.nested.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/destructuring-params.nested.js: exception: " + e);
}
