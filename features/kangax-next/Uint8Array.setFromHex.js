// compat-table: ES Next > Stage 3 > Uint8Array to/from base64 and hex (small) > Uint8Array.setFromHex()
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/setFromHex
// spec: https://github.com/tc39/proposal-arraybuffer-base64
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  const arr1 = new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]);
  let arr2 = new Uint8Array(16);
  let { read, written } = arr2.setFromHex("48656c6c6f20576f726c64");
  return read == 22 && written == 11 &&
         arr1.every((element, index) => element === arr2[index]);
}

try {
  if (testCode()) {
    console.log("kangax-next/Uint8Array.setFromHex.js: OK");
  } else {
    console.log("kangax-next/Uint8Array.setFromHex.js: failed");
  }
} catch (e) {
  console.log("kangax-next/Uint8Array.setFromHex.js: exception: " + e);
}
