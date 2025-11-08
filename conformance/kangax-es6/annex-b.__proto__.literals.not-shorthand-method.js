// compat-table: ES6 > annex b > __proto__ in object literals (tiny) > not a shorthand method
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto#Specifications
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-__proto__-property-names-in-object-initializers
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  if (!({ __proto__ : [] } instanceof Array)) {
    return false;
  }
  return !({ __proto__(){} } instanceof Function);
}

try {
  if (testCode()) {
    console.log("kangax-es6/annex-b.__proto__.literals.not-shorthand-method.js: OK");
  } else {
    console.log("kangax-es6/annex-b.__proto__.literals.not-shorthand-method.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/annex-b.__proto__.literals.not-shorthand-method.js: exception: " + e);
}
