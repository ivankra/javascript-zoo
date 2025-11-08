// compat-table: ES6 > bindings > const (medium) > for-of loop iteration scope
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-let-and-const-declarations
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var scopes = [];
  for(const i of ['a','b']) {
    scopes.push(function(){ return i; });
  }
  return (scopes[0]() === "a" && scopes[1]() === "b");
}

try {
  if (testCode()) {
    console.log("kangax-es6/const.for-of.js: OK");
  } else {
    console.log("kangax-es6/const.for-of.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/const.for-of.js: exception: " + e);
}
