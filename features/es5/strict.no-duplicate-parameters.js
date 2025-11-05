// ES5: 13.1 Strict Mode Restrictions
// ES5: Annex C The Strict Mode of ECMAScript
// compat-table: ES5 > Strict mode (large) > repeated parameter names is a SyntaxError
//
// "A strict mode function may not have two or more formal parameters
// that have the same name. An attempt to create such a function using a
// FunctionDeclaration, FunctionExpression, or Function constructor is a
// SyntaxError (13.1, 15.3.2)."
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var result = (function() {
  'use strict';

  var ok = 0;

  try {
    eval('function f(x, x) { }');
  } catch (e) {
    if (e instanceof SyntaxError) ok++;
  }

  try {
    eval('(function(x, x) { })');
  } catch (e) {
    if (e instanceof SyntaxError) ok++;
  }

  try {
    Function('x', 'x', '"use strict"');
  } catch (e) {
    if (e instanceof SyntaxError) ok++;
  }

  return ok;
})();

if (result === 3) {
  console.log("es5/strict.no-duplicate-parameters.js: OK");
} else {
  console.log("es5/strict.no-duplicate-parameters.js: failed");
}
