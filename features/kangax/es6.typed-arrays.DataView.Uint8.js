// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView
// compat-table: ES6 > built-ins > typed arrays (large) > DataView (Uint8)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var buffer = new ArrayBuffer(64);
  var view = new DataView(buffer);
  view.setUint8(0, 0x100);
  return view.getUint8(0) === 0;
}

try {
  if (testCode()) {
    console.log("es6.typed-arrays.DataView.Uint8.js: OK");
  } else {
    console.log("es6.typed-arrays.DataView.Uint8.js: FAIL");
  }
} catch (e) {
  console.log("es6.typed-arrays.DataView.Uint8.js: FAIL: " + e);
}