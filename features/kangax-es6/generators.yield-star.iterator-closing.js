// compat-table: ES6 > functions > generators (large) > yield *, iterator closing
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-generator-function-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT


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
  var closed = '';
  var iter = __createIterableObject([1, 2, 3], {
    'return': function(){
      closed += 'a';
      return {done: true};
    }
  });
  var gen = (function* generator(){
    try {
      yield *iter;
    } finally {
      closed += 'b';
    }
  })();
  gen.next();
  gen['return']();
  return closed === 'ab';
}

try {
  if (testCode()) {
    console.log("kangax-es6/generators.yield-star.iterator-closing.js: OK");
  } else {
    console.log("kangax-es6/generators.yield-star.iterator-closing.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/generators.yield-star.iterator-closing.js: exception: " + e);
}
