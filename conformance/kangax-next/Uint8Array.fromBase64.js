// compat-table: ES Next > Stage 3 > Uint8Array to/from base64 and hex (small) > Uint8Array.fromBase64()
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/fromBase64
// spec: https://github.com/tc39/proposal-arraybuffer-base64
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  const arr1 = new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]);
  const arr2 = Uint8Array.fromBase64("SGVsbG8gV29ybGQ=");
  return arr1.length === arr2.length &&
         arr1.every((element, index) => element === arr2[index]);
}

try {
  if (testCode()) {
    console.log("kangax-next/Uint8Array.fromBase64.js: OK");
  } else {
    console.log("kangax-next/Uint8Array.fromBase64.js: failed");
  }
} catch (e) {
  console.log("kangax-next/Uint8Array.fromBase64.js: exception: " + e);
}
