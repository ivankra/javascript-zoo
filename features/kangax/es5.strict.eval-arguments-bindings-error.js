// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
// compat-table: ES5 > Strict mode (large) > eval or arguments bindings is a SyntaxError
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  try { eval('var eval');                return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
  try { eval('var arguments');           return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
  try { eval('(function(eval){})');      return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
  try { eval('(function(arguments){})'); return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
  try { eval('try{}catch(eval){}');      return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
  try { eval('try{}catch(arguments){}'); return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
  return true;
}

try {
  if (testCode()) {
    console.log("es5.strict.eval-arguments-bindings-error.js: OK");
  } else {
    console.log("es5.strict.eval-arguments-bindings-error.js: FAIL");
  }
} catch (e) {
  console.log("es5.strict.eval-arguments-bindings-error.js: FAIL: " + e);
}