// ES6: https://github.com/tc39/ecma262/pull/689
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments/caller
// compat-table: ES2016+ > 2017 misc > arguments.caller removed (tiny)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return (function () {
    'use strict';
    return !Object.getOwnPropertyDescriptor(arguments, 'caller');
  })();
}

try {
  if (testCode()) {
    console.log("es2017.misc.arguments-caller-removed.js: OK");
  } else {
    console.log("es2017.misc.arguments-caller-removed.js: FAIL");
  }
} catch (e) {
  console.log("es2017.misc.arguments-caller-removed.js: FAIL: " + e);
}