// compat-table: ES5 > Strict mode (large) > "this" is not coerced to object in primitive accessors
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';

  function test(Class, instance) {
    Object.defineProperty(Class.prototype, 'test', {
      get: function () { passed = passed && this === instance; },
      set: function () { passed = passed && this === instance; },
      configurable: true
    });

    var passed = true;
    instance.test;
    instance.test = 42;
    return passed;
  }

  return test(String, '')
    && test(Number, 1)
    && test(Boolean, true);
}

try {
  if (testCode()) {
    console.log("kangax-es5/strict.this-not-coerced-accessors.js: OK");
  } else {
    console.log("kangax-es5/strict.this-not-coerced-accessors.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/strict.this-not-coerced-accessors.js: exception: " + e);
}
