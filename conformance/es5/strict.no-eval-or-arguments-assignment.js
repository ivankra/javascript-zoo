// ES5: Annex C The Strict Mode of ECMAScript
// compat-table: ES5 > Strict mode (large) > assignment to eval or arguments is a SyntaxError
//
// "The identifier eval or arguments may not appear as the
// LeftHandSideExpression of an Assignment operator (11.13) or of a
// PostfixExpression (11.3) or as the UnaryExpression operated upon by a
// Prefix Increment (11.4.4) or a Prefix Decrement (11.4.5) operator."
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var result = (function() {
  'use strict';

  var ok = 0;

  try {
    eval('eval = 1');
  } catch (e) {
    if (e instanceof SyntaxError) ok++;
  }

  try {
    eval('arguments = 1');
  } catch (e) {
    if (e instanceof SyntaxError) ok++;
  }

  try {
    eval('eval++');
  } catch (e) {
    if (e instanceof SyntaxError) ok++;
  }

  try {
    eval('arguments++');
  } catch (e) {
    if (e instanceof SyntaxError) ok++;
  }

  try {
    eval('++eval');
  } catch (e) {
    if (e instanceof SyntaxError) ok++;
  }

  try {
    eval('--arguments');
  } catch (e) {
    if (e instanceof SyntaxError) ok++;
  }

  return ok;
})();

if (result === 6) {
  console.log("es5/strict.no-eval-or-arguments-assignment.js: OK");
} else {
  console.log("es5/strict.no-eval-or-arguments-assignment.js: failed");
}
