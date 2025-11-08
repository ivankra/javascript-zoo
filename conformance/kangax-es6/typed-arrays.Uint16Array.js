// compat-table: ES6 > built-ins > typed arrays (large) > Uint16Array
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var buffer = new ArrayBuffer(64);
  var view = new Uint16Array(buffer);       view[0] = 0x10000;
  return view[0] === 0;
}

try {
  if (testCode()) {
    console.log("kangax-es6/typed-arrays.Uint16Array.js: OK");
  } else {
    console.log("kangax-es6/typed-arrays.Uint16Array.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/typed-arrays.Uint16Array.js: exception: " + e);
}
