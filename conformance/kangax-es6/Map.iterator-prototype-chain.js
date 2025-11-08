// compat-table: ES6 > built-ins > Map (medium) > Map iterator prototype chain
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-map-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Iterator instance
  var iterator = new Map()[Symbol.iterator]();
  // %MapIteratorPrototype%
  var proto1 = Object.getPrototypeOf(iterator);
  // %IteratorPrototype%
  var proto2 = Object.getPrototypeOf(proto1);

  return proto2.hasOwnProperty(Symbol.iterator) &&
    !proto1    .hasOwnProperty(Symbol.iterator) &&
    !iterator  .hasOwnProperty(Symbol.iterator) &&
    iterator[Symbol.iterator]() === iterator;
}

try {
  if (testCode()) {
    console.log("kangax-es6/Map.iterator-prototype-chain.js: OK");
  } else {
    console.log("kangax-es6/Map.iterator-prototype-chain.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Map.iterator-prototype-chain.js: exception: " + e);
}
