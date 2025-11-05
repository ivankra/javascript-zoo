// compat-table: ES6 > built-ins > Set (medium) > basic functionality
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-set-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var obj = {};
  var set = new Set();

  set.add(123);
  set.add(123);

  return set.has(123);
}

try {
  if (testCode()) {
    console.log("kangax-es6/Set.js: OK");
  } else {
    console.log("kangax-es6/Set.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Set.js: exception: " + e);
}
