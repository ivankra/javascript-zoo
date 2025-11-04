// ES6: https://tc39.github.io/ecma262/#sec-properties-of-the-object-constructor
// compat-table: ES2016+ > 2017 features > Object static methods (medium) > Object.getOwnPropertyDescriptors doesn't provide undefined descriptors
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var P = new Proxy({ a: 1 }, {
    getOwnPropertyDescriptor: function (t, k) {}
  });
  return !Object.getOwnPropertyDescriptors(P).hasOwnProperty('a');
}

try {
  if (testCode()) {
    console.log("es2017.Object.getOwnPropertyDescriptors.no-undefined.js: OK");
  } else {
    console.log("es2017.Object.getOwnPropertyDescriptors.no-undefined.js: FAIL");
  }
} catch (e) {
  console.log("es2017.Object.getOwnPropertyDescriptors.no-undefined.js: FAIL: " + e);
}