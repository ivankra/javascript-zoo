// compat-table: ES5 > Strict mode (large) > assignment to eval or arguments is a SyntaxError
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  try { eval('eval = 1');      return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
  try { eval('arguments = 1'); return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
  try { eval('eval++');        return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
  try { eval('arguments++');   return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
  return true;
}

try {
  if (testCode()) {
    console.log("kangax-es5/strict.assignment-eval-arguments-error.js: OK");
  } else {
    console.log("kangax-es5/strict.assignment-eval-arguments-error.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/strict.assignment-eval-arguments-error.js: exception: " + e);
}
