// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView
// compat-table: ES6 > built-ins > typed arrays (large) > DataView (Int32)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var buffer = new ArrayBuffer(64);
  var view = new DataView(buffer);
  view.setInt32(0, 0x80000000);
  return view.getInt32(0) === -0x80000000;
}

try {
  if (testCode()) {
    console.log("es6.typed-arrays.DataView.Int32.js: OK");
  } else {
    console.log("es6.typed-arrays.DataView.Int32.js: FAIL");
  }
} catch (e) {
  console.log("es6.typed-arrays.DataView.Int32.js: FAIL: " + e);
}