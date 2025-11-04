// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
// compat-table: ES5 > Strict mode (large) > reserved words
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  var words = 'implements,interface,let,package,private,protected,public,static,yield'.split(',');
  for (var i = 0; i < 9; i+=1) {
    try { eval('var ' + words[i]); return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
  }
  return true;
}

try {
  if (testCode()) {
    console.log("es5.strict.reserved-words.js: OK");
  } else {
    console.log("es5.strict.reserved-words.js: FAIL");
  }
} catch (e) {
  console.log("es5.strict.reserved-words.js: FAIL: " + e);
}