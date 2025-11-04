// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-__proto__-property-names-in-object-initializers
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto#Specifications
// compat-table: ES6 > annex b > __proto__ in object literals (tiny) > multiple __proto__ is an error
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  try {
    eval("({ __proto__ : [], __proto__: {} })");
  }
  catch(e) {
    return true;
  }
}

try {
  if (testCode()) {
    console.log("annexb.es6.__proto__.literals.multiple-error.js: OK");
  } else {
    console.log("annexb.es6.__proto__.literals.multiple-error.js: FAIL");
  }
} catch (e) {
  console.log("annexb.es6.__proto__.literals.multiple-error.js: FAIL: " + e);
}