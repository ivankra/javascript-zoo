// ES6: https://github.com/tc39/proposal-bigint
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
// compat-table: ES2016+ > 2020 features > BigInt (medium) > BigUint64Array
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var buffer = new ArrayBuffer(64);
  var view = new BigUint64Array(buffer);
  view[0] = 0x10000000000000000n;
  return view[0] === 0n;
}

try {
  if (testCode()) {
    console.log("es2020.BigUint64Array.js: OK");
  } else {
    console.log("es2020.BigUint64Array.js: FAIL");
  }
} catch (e) {
  console.log("es2020.BigUint64Array.js: FAIL: " + e);
}