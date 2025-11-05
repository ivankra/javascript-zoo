// ES5: 10.1.1 Strict Mode Code
// ES5: Annex C The Strict Mode of ECMAScript
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
//
// Basic test that strict mode is supported and active.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var strictWorks = (function() {
  'use strict';
  try {
    testVariable = 1;
    return false;
  } catch (e) {
    return e instanceof ReferenceError;
  }
})();

var nonStrictWorks = (function() {
  try {
    testVariable2 = 1;
    return true;
  } catch (e) {
    return false;
  }
})();

if (strictWorks && nonStrictWorks) {
  console.log("es5/strict.js: OK");
} else {
  console.log("es5/strict.js: failed");
}
