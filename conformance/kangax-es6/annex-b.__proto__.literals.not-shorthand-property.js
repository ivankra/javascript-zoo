// compat-table: ES6 > annex b > __proto__ in object literals (tiny) > not a shorthand property
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
  var __proto__ = [];
  return !({ __proto__ } instanceof Array);
}

try {
  if (testCode()) {
    console.log("kangax-es6/annex-b.__proto__.literals.not-shorthand-property.js: OK");
  } else {
    console.log("kangax-es6/annex-b.__proto__.literals.not-shorthand-property.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/annex-b.__proto__.literals.not-shorthand-property.js: exception: " + e);
}
