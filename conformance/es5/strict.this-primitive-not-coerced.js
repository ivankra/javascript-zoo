// ES5: 10.4.3 Entering Function Code
// compat-table: ES5 > Strict mode (large) > "this" is not coerced to object in primitive methods
//
// "If this is evaluated within strict mode code, then the this value
// is not coerced to an object."
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var result = (function() {
  'use strict';

  var stringThis = (function() { return typeof this === 'string'; }).call('');
  if (!stringThis) {
    console.log("es5/strict.this-primitive-not-coerced.js: failed: string 'this' was coerced to object");
    return false;
  }

  var numberThis = (function() { return typeof this === 'number'; }).call(1);
  if (!numberThis) {
    console.log("es5/strict.this-primitive-not-coerced.js: failed: number 'this' was coerced to object");
    return false;
  }

  var booleanThis = (function() { return typeof this === 'boolean'; }).call(true);
  if (!booleanThis) {
    console.log("es5/strict.this-primitive-not-coerced.js: failed: boolean 'this' was coerced to object");
    return false;
  }

  return true;
})();

if (result) {
  console.log("es5/strict.this-primitive-not-coerced.js: OK");
}
