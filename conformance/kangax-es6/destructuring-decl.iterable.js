// compat-table: ES6 > syntax > destructuring, declarations (medium) > with generic iterables
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
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
  var [a, b, c] = global.__createIterableObject([1, 2]);
  return a === 1 && b === 2 && c === void undefined;
}

try {
  if (testCode()) {
    console.log("kangax-es6/destructuring-decl.iterable.js: OK");
  } else {
    console.log("kangax-es6/destructuring-decl.iterable.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/destructuring-decl.iterable.js: exception: " + e);
}
