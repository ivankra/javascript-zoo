// compat-table: ES2016+ > 2020 features > BigInt (medium) > BigInt64Array
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
// spec: https://github.com/tc39/proposal-bigint
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var buffer = new ArrayBuffer(64);
  var view = new BigInt64Array(buffer);
  view[0] = 0x8000000000000000n;
  return view[0] === -0x8000000000000000n;
}

try {
  if (testCode()) {
    console.log("kangax-es2020/BigInt64Array.js: OK");
  } else {
    console.log("kangax-es2020/BigInt64Array.js: failed");
  }
} catch (e) {
  console.log("kangax-es2020/BigInt64Array.js: exception: " + e);
}
