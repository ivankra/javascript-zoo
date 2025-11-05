// compat-table: ES6 > syntax > object literal extensions (large) > shorthand properties
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-object-initialiser
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var a = 7, b = 8, c = {a,b};
  return c.a === 7 && c.b === 8;
}

try {
  if (testCode()) {
    console.log("kangax-es6/literals.object.shorthand-properties.js: OK");
  } else {
    console.log("kangax-es6/literals.object.shorthand-properties.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/literals.object.shorthand-properties.js: exception: " + e);
}
