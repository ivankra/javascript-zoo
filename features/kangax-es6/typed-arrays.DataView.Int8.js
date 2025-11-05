// compat-table: ES6 > built-ins > typed arrays (large) > DataView (Int8)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var buffer = new ArrayBuffer(64);
  var view = new DataView(buffer);
  view.setInt8 (0, 0x80);
  return view.getInt8(0) === -0x80;
}

try {
  if (testCode()) {
    console.log("kangax-es6/typed-arrays.DataView.Int8.js: OK");
  } else {
    console.log("kangax-es6/typed-arrays.DataView.Int8.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/typed-arrays.DataView.Int8.js: exception: " + e);
}
