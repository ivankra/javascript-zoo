// ES5: 12.2.1 Strict Mode Restrictions
// ES5: 12.14.1 Strict Mode Restrictions
// ES5: 13.1 Strict Mode Restrictions
// compat-table: ES5 > Strict mode (large) > eval or arguments bindings is a SyntaxError
//
// "It is a SyntaxError if a VariableDeclaration or
// VariableDeclarationNoIn occurs within strict code and its Identifier is
// eval or arguments (12.2.1)."
//
// "It is a SyntaxError if a TryStatement with a Catch occurs within
// strict code and the Identifier of the Catch production is eval or
// arguments (12.14.1)"
//
// "It is a SyntaxError if the identifier eval or arguments appears
// within a FormalParameterList of a strict mode FunctionDeclaration or
// FunctionExpression (13.1)"
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var result = (function() {
  'use strict';

  var ok = 0;

  try {
    eval('var eval;');
  } catch (e) {
    if (e instanceof SyntaxError) ok++;
  }

  try {
    eval('var arguments;');
  } catch (e) {
    if (e instanceof SyntaxError) ok++;
  }

  try {
    eval('(function(eval) {})');
  } catch (e) {
    if (e instanceof SyntaxError) ok++;
  }

  try {
    eval('(function(arguments) {})');
  } catch (e) {
    if (e instanceof SyntaxError) ok++;
  }

  try {
    eval('try {} catch (eval) {}');
  } catch (e) {
    if (e instanceof SyntaxError) ok++;
  }

  try {
    eval('try {} catch (arguments) {}');
  } catch (e) {
    if (e instanceof SyntaxError) ok++;
  }

  return ok;
})();

if (result === 6) {
  console.log("es5/strict.no-eval-or-arguments-bindings.js: OK");
} else {
  console.log("es5/strict.no-eval-or-arguments-bindings.js: failed");
}
