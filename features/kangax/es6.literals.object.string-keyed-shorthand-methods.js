// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-object-initialiser
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015
// compat-table: ES6 > syntax > object literal extensions (large) > string-keyed shorthand methods
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return ({ "foo bar"() { return 4; } })["foo bar"]() === 4;
}

try {
  if (testCode()) {
    console.log("es6.literals.object.string-keyed-shorthand-methods.js: OK");
  } else {
    console.log("es6.literals.object.string-keyed-shorthand-methods.js: FAIL");
  }
} catch (e) {
  console.log("es6.literals.object.string-keyed-shorthand-methods.js: FAIL: " + e);
}