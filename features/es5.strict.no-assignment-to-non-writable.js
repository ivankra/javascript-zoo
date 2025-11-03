// ES5: 11.13.1 Simple Assignment ( = )
// ES5: Annex C The Strict Mode of ECMAScript
// compat-table: ES5 > Strict mode (large) > assignment to non-writable properties is a TypeError
//
// "The LeftHandSide [of assignment] also may not be a reference to a data property
// with the attribute value {[[Writable]]:false}"
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var result = (function() {
  'use strict';

  var ok = 0;

  try {
    Object.defineProperty({},"x",{ writable: false }).x = 1;
  } catch (e) {
    if (e instanceof TypeError) ok++;
  }

  try {
    Object.preventExtensions({}).x = 1;
  } catch (e) {
    if (e instanceof TypeError) ok++;
  }

  try {
    ({ get x(){ } }).x = 1;
  } catch (e) {
    if (e instanceof TypeError) ok++;
  }

  try {
    (function f() { f = 123; })();
  } catch (e) {
    if (e instanceof TypeError) ok++;
  }

  return ok;
})();

if (result === 4) {
  console.log("es5.strict.no-assignment-to-non-writable.js: OK");
} else {
  console.log("es5.strict.no-assignment-to-non-writable.js: FAIL");
}
