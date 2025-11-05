// compat-table: ES6 > bindings > let (medium) > for/for-in loop iteration scope (strict mode)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-let-and-const-declarations
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  let scopes = [];
  for(let i = 0; i < 2; i++) {
    scopes.push(function(){ return i; });
  }
  let passed = (scopes[0]() === 0 && scopes[1]() === 1);

  scopes = [];
  for(let i in { a:1, b:1 }) {
    scopes.push(function(){ return i; });
  }
  passed &= (scopes[0]() === "a" && scopes[1]() === "b");
  return passed;
}

try {
  if (testCode()) {
    console.log("kangax-es6/let.strict.for-iteration.js: OK");
  } else {
    console.log("kangax-es6/let.strict.for-iteration.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/let.strict.for-iteration.js: exception: " + e);
}
