// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView
// compat-table: ES6 > built-ins > typed arrays (large) > DataView (Int16)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var buffer = new ArrayBuffer(64);
  var view = new DataView(buffer);
  view.setInt16(0, 0x8000);
  return view.getInt16(0) === -0x8000;
}

try {
  if (testCode()) {
    console.log("es6.typed-arrays.DataView.Int16.js: OK");
  } else {
    console.log("es6.typed-arrays.DataView.Int16.js: FAIL");
  }
} catch (e) {
  console.log("es6.typed-arrays.DataView.Int16.js: FAIL: " + e);
}