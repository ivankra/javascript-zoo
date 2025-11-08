// ES5: 8.12.3 [[Get]], 8.12.5 [[Put]]
// compat-table: ES5 > Strict mode (large) > "this" is not coerced to object in primitive accessors
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var result = (function() {
  'use strict';

  function test(Class, instance) {
    Object.defineProperty(Class.prototype, 'test', {
      get: function() { passed = passed && this === instance; },
      set: function() { passed = passed && this === instance; },
      configurable: true
    });

    var passed = true;
    instance.test;
    instance.test = 42;
    return passed;
  }

  if (!test(String, '')) {
    console.log("es5/strict.this-primitive-not-coerced-in-accessors.js: failed: string 'this' was coerced in accessor");
    return false;
  }

  if (!test(Number, 1)) {
    console.log("es5/strict.this-primitive-not-coerced-in-accessors.js: failed: number 'this' was coerced in accessor");
    return false;
  }

  if (!test(Boolean, true)) {
    console.log("es5/strict.this-primitive-not-coerced-in-accessors.js: failed: boolean 'this' was coerced in accessor");
    return false;
  }

  return true;
})();

if (result) {
  console.log("es5/strict.this-primitive-not-coerced-in-accessors.js: OK");
}
