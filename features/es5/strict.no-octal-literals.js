// ES5: B.1.1 Numeric Literals
// ES5: B.1.2 String Literals
// compat-table: ES5 > Strict mode (large) > legacy octal is a SyntaxError
//
// "A conforming implementation, when processing strict mode code, may not
// extend the syntax of NumericLiteral (7.8.3) to include OctalIntegerLiteral
// as described in B.1.1."
//
// "A conforming implementation, when processing strict mode code (see
// 10.1.1), may not extend the syntax of EscapeSequence to include
// OctalEscapeSequence as described in B.1.2."
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var result = (function() {
  'use strict';

  var ok = 0;

  try {
    eval('010');
  } catch (e) {
    if (e instanceof SyntaxError) ok++;
  }

  try {
    eval('"\\010"');
  } catch (e) {
    if (e instanceof SyntaxError) ok++;
  }

  return ok;
})();

if (result === 2) {
  console.log("es5/strict.no-octal-literals.js: OK");
} else {
  console.log("es5/strict.no-octal-literals.js: failed");
}
