// compat-table: ES6 > built-ins > typed arrays (large) > Int16Array
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int16Array
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var buffer = new ArrayBuffer(64);
  var view = new Int16Array(buffer);        view[0] = 0x8000;
  return view[0] === -0x8000;
}

try {
  if (testCode()) {
    console.log("kangax-es6/typed-arrays.Int16Array.js: OK");
  } else {
    console.log("kangax-es6/typed-arrays.Int16Array.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/typed-arrays.Int16Array.js: exception: " + e);
}
