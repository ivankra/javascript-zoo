// compat-table: ES6 > syntax > for..of loops (large) > with instances of generic iterables
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-for-in-and-for-of-statements
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
  var result = "";
  var iterable = global.__createIterableObject([1, 2, 3]);
  for (var item of Object.create(iterable)) {
    result += item;
  }
  return result === "123";
}

try {
  if (testCode()) {
    console.log("kangax-es6/for-of.iterable-instance.js: OK");
  } else {
    console.log("kangax-es6/for-of.iterable-instance.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/for-of.iterable-instance.js: exception: " + e);
}
