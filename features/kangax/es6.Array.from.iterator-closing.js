// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-array-constructor
// compat-table: ES6 > built-in extensions > Array static methods (medium) > Array.from, iterator closing
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
    'return': function(){ closed = true; return {}; }
  });
  try {
    Array.from(iter, function() { throw 42 });
  } catch(e){}
  return closed;
}

try {
  if (testCode()) {
    console.log("es6.Array.from.iterator-closing.js: OK");
  } else {
    console.log("es6.Array.from.iterator-closing.js: FAIL");
  }
} catch (e) {
  console.log("es6.Array.from.iterator-closing.js: FAIL: " + e);
}