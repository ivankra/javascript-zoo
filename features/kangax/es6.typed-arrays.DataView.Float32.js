// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView
// compat-table: ES6 > built-ins > typed arrays (large) > DataView (Float32)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var buffer = new ArrayBuffer(64);
  var view = new DataView(buffer);
  view.setFloat32(0, 0.1);
  return view.getFloat32(0) === 0.10000000149011612;
}

try {
  if (testCode()) {
    console.log("es6.typed-arrays.DataView.Float32.js: OK");
  } else {
    console.log("es6.typed-arrays.DataView.Float32.js: FAIL");
  }
} catch (e) {
  console.log("es6.typed-arrays.DataView.Float32.js: FAIL: " + e);
}