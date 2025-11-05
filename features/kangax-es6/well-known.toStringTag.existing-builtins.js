// compat-table: ES6 > built-ins > well-known symbols (medium) > Symbol.toStringTag affects existing built-ins
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var s = Symbol.toStringTag;
  var passed = true;
  [
    [Array.prototype, []],
    [String.prototype, ''],
    [arguments, arguments],
    [Function.prototype, function(){}],
    [Error.prototype, new Error()],
    [Boolean.prototype, true],
    [Number.prototype, 2],
    [Date.prototype, new Date()],
    [RegExp.prototype, /./]
  ].forEach(function(pair){
    pair[0][s] = "foo";
    passed &= (Object.prototype.toString.call(pair[1]) === "[object foo]");
    delete pair[0][s];
  });
  return passed;
}

try {
  if (testCode()) {
    console.log("kangax-es6/well-known.toStringTag.existing-builtins.js: OK");
  } else {
    console.log("kangax-es6/well-known.toStringTag.existing-builtins.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/well-known.toStringTag.existing-builtins.js: exception: " + e);
}
