// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
// compat-table: ES5 > Strict mode (large) > assignment to non-writable properties is a TypeError
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  try { Object.defineProperty({},"x",{ writable: false }).x = 1; return false; } catch (err) { if (!(err instanceof TypeError)) return false; }
  try { Object.preventExtensions({}).x = 1;                      return false; } catch (err) { if (!(err instanceof TypeError)) return false; }
  try { ({ get x(){ } }).x = 1;                                  return false; } catch (err) { if (!(err instanceof TypeError)) return false; }
  try { (function f() { f = 123; })();                           return false; } catch (err) { if (!(err instanceof TypeError)) return false; }
  return true;
}

try {
  if (testCode()) {
    console.log("es5.strict.assignment-non-writable-error.js: OK");
  } else {
    console.log("es5.strict.assignment-non-writable-error.js: FAIL");
  }
} catch (e) {
  console.log("es5.strict.assignment-non-writable-error.js: FAIL: " + e);
}