// ES5: 13.2 Creating Function Objects
// ES5: Annex C The Strict Mode of ECMAScript
// compat-table: ES5 > Strict mode (large) > (function(){}).caller and (function(){}).arguments is a TypeError
//
// "Arguments objects for strict mode functions define non-configurable
// accessor properties named "caller" and "callee" which throw a TypeError
// exception on access (10.6)."
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var result = (function() {
  'use strict';

  var ok = 0;

  try {
    (function(){}).caller;
  } catch (e) {
    if (e instanceof TypeError) ok++;
  }

  try {
    (function(){}).arguments;
  } catch (e) {
    if (e instanceof TypeError) ok++;
  }

  return ok;
})();

if (result === 2) {
  console.log("es5/strict.no-function-caller-or-arguments.js: OK");
} else {
  console.log("es5/strict.no-function-caller-or-arguments.js: failed");
}
