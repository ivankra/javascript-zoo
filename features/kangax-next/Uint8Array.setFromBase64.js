// compat-table: ES Next > Stage 3 > Uint8Array to/from base64 and hex (small) > Uint8Array.setFromBase64()
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/setFromBase64
// spec: https://github.com/tc39/proposal-arraybuffer-base64
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  const arr1 = new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]);
  let arr2 = new Uint8Array(16);
  let { read, written } = arr2.setFromBase64("SGVsbG8gV29ybGQ=");
  return read == 16 && written == 11 &&
         arr1.every((element, index) => element === arr2[index]);
}

try {
  if (testCode()) {
    console.log("kangax-next/Uint8Array.setFromBase64.js: OK");
  } else {
    console.log("kangax-next/Uint8Array.setFromBase64.js: failed");
  }
} catch (e) {
  console.log("kangax-next/Uint8Array.setFromBase64.js: exception: " + e);
}
