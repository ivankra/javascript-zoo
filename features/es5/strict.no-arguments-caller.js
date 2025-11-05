// ES5: 10.6 Arguments Object
// ES5: Annex C The Strict Mode of ECMAScript
// compat-table: ES5 > Strict mode (large) > arguments.caller removed or is a TypeError
//
// "Arguments objects for strict mode functions do not dynamically share
// their array indexed property values with the corresponding formal
//  parameter bindings of their functions. (10.6)."
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var result = (function() {
  'use strict';

  if ('caller' in arguments) {
    try {
      arguments.caller;
      return false;
    } catch (e) {
      if (!(e instanceof TypeError)) return false;
    }
  }

  return true;
})();

if (result === true) {
  console.log("es5/strict.no-arguments-caller.js: OK");
} else {
  console.log("es5/strict.no-arguments-caller.js: failed");
}
