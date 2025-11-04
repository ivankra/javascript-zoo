// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-generator-function-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
// compat-table: ES6 > functions > generators (large) > yield *, iterator closing via throw()
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (typeof global === "undefined") global = this;

function __createIterableObject(arr, methods) {
  methods = methods || {};
  if (typeof Symbol !== "function" || !Symbol.iterator) {
    return {};
  }
  arr.length++;
  var iterator = {
    next: function() {
      return { value: arr.shift(), done: arr.length <= 0 };
    },
    "return": methods["return"],
    "throw": methods["throw"]
  };
  var iterable = {};
  iterable[Symbol.iterator] = function(){ return iterator; };
  return iterable;
}

if (typeof global !== "undefined") {
  global.__createIterableObject = __createIterableObject;
}

function testCode() {
  var closed = false;
  var iter = global.__createIterableObject([1, 2, 3], {
    'throw': undefined,
    'return': function() {
      closed = true;
      return {done: true};
    }
  });
  var gen = (function*(){
    try {
      yield *iter;
    } catch(e){}
  })();
  gen.next();
  gen['throw']();
  return closed;
}

try {
  if (testCode()) {
    console.log("es6.generators.yield-star.iterator-closing-throw.js: OK");
  } else {
    console.log("es6.generators.yield-star.iterator-closing-throw.js: FAIL");
  }
} catch (e) {
  console.log("es6.generators.yield-star.iterator-closing-throw.js: FAIL: " + e);
}