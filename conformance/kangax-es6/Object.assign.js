// compat-table: ES6 > built-in extensions > Object static methods (medium) > Object.assign
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-object-constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var o = Object.assign({a:true}, {b:true}, {c:true});
  return "a" in o && "b" in o && "c" in o;
}

try {
  if (testCode()) {
    console.log("kangax-es6/Object.assign.js: OK");
  } else {
    console.log("kangax-es6/Object.assign.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Object.assign.js: exception: " + e);
}
