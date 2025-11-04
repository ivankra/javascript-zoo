// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-let-and-const-declarations
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
// compat-table: ES6 > bindings > let (medium) > for/for-in loop iteration scope
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
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
    console.log("es6.let.for-iteration.js: OK");
  } else {
    console.log("es6.let.for-iteration.js: FAIL");
  }
} catch (e) {
  console.log("es6.let.for-iteration.js: FAIL: " + e);
}