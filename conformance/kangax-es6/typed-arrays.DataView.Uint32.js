// compat-table: ES6 > built-ins > typed arrays (large) > DataView (Uint32)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var buffer = new ArrayBuffer(64);
  var view = new DataView(buffer);
  view.setUint32(0, 0x100000000);
  return view.getUint32(0) === 0;
}

try {
  if (testCode()) {
    console.log("kangax-es6/typed-arrays.DataView.Uint32.js: OK");
  } else {
    console.log("kangax-es6/typed-arrays.DataView.Uint32.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/typed-arrays.DataView.Uint32.js: exception: " + e);
}
