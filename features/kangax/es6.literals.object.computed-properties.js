// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-object-initialiser
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015
// compat-table: ES6 > syntax > object literal extensions (large) > computed properties
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var x = 'y';
  return ({ [x]: 1 }).y === 1;
}

try {
  if (testCode()) {
    console.log("es6.literals.object.computed-properties.js: OK");
  } else {
    console.log("es6.literals.object.computed-properties.js: FAIL");
  }
} catch (e) {
  console.log("es6.literals.object.computed-properties.js: FAIL: " + e);
}