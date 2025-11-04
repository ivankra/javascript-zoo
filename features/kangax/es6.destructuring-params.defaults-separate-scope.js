// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// compat-table: ES6 > syntax > destructuring, parameters (medium) > defaults, separate scope
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return (function({a=function(){
    return typeof b === 'undefined';
  }}){
    var b = 1;
    return a();
  }({}));
}

try {
  if (testCode()) {
    console.log("es6.destructuring-params.defaults-separate-scope.js: OK");
  } else {
    console.log("es6.destructuring-params.defaults-separate-scope.js: FAIL");
  }
} catch (e) {
  console.log("es6.destructuring-params.defaults-separate-scope.js: FAIL: " + e);
}