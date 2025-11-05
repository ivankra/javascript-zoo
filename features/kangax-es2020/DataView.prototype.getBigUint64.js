// compat-table: ES2016+ > 2020 features > BigInt (medium) > DataView.prototype.getBigUint64
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
// spec: https://github.com/tc39/proposal-bigint
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var buffer = new ArrayBuffer(64);
  var view = new DataView(buffer);
  view.setBigUint64(0, 1n);
  return view.getBigUint64(0) === 1n;
}

try {
  if (testCode()) {
    console.log("kangax-es2020/DataView.prototype.getBigUint64.js: OK");
  } else {
    console.log("kangax-es2020/DataView.prototype.getBigUint64.js: failed");
  }
} catch (e) {
  console.log("kangax-es2020/DataView.prototype.getBigUint64.js: exception: " + e);
}
