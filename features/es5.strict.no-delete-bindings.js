// ES5: 11.4.1 The delete Operator
// ES5: Annex C The Strict Mode of ECMAScript
// compat-table: ES5 > Strict mode (large) > deleting bindings is a SyntaxError
//
// "When a delete operator occurs within strict mode code, a SyntaxError
// is thrown if its UnaryExpression is a direct reference to a variable,
// function argument, or function name(11.4.1)."
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var result = (function() {
  'use strict';

  var ok = 0;

  try {
    eval('var x; delete x;');
  } catch (e) {
    if (e instanceof SyntaxError) ok++;
  }

  try {
    eval('(function(arg){ delete arg; })');
  } catch (e) {
    if (e instanceof SyntaxError) ok++;
  }

  try {
    eval('function fn(){ delete fn; }');
  } catch (e) {
    if (e instanceof SyntaxError) ok++;
  }

  return ok;
})();

if (result === 3) {
  console.log("es5.strict.no-delete-bindings.js: OK");
} else {
  console.log("es5.strict.no-delete-bindings.js: FAIL");
}
