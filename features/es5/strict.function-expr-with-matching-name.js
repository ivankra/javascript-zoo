// compat-table: ES5 > Strict mode (large) > function expressions with matching name and argument are valid
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var foo = function bar(bar) {'use strict'};
if (typeof foo === 'function') {
  ok++;
}

try {
  eval('"use strict"; function bar(bar) {}');
  ok++;
} catch (e) {
}

if (ok === 2) {
  console.log("es5/strict.function-expr-with-matching-name.js: OK");
} else {
  console.log("es5/strict.function-expr-with-matching-name.js: failed");
}
