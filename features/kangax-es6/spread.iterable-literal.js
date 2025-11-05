// compat-table: ES6 > syntax > spread syntax for iterable objects (large) > with generic iterables, in arrays
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-argument-lists-runtime-semantics-argumentlistevaluation
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
  var iterable = global.__createIterableObject(["b", "c", "d"]);
  return ["a", ...iterable, "e"][3] === "d";
}

try {
  if (testCode()) {
    console.log("kangax-es6/spread.iterable-literal.js: OK");
  } else {
    console.log("kangax-es6/spread.iterable-literal.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/spread.iterable-literal.js: exception: " + e);
}
