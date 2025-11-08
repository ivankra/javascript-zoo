// compat-table: ES6 > annex b > __proto__ in object literals (tiny) > multiple __proto__ is an error
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto#Specifications
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-__proto__-property-names-in-object-initializers
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
    console.log("kangax-es6/annex-b.__proto__.literals.multiple-error.js: OK");
  } else {
    console.log("kangax-es6/annex-b.__proto__.literals.multiple-error.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/annex-b.__proto__.literals.multiple-error.js: exception: " + e);
}
