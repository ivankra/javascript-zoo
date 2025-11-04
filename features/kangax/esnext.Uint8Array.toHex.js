// ES6: https://github.com/tc39/proposal-arraybuffer-base64
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/toHex
// compat-table: ES Next > Stage 3 > Uint8Array to/from base64 and hex (small) > Uint8Array.toHex()
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  const arr = new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]);
  return arr.toHex() === "48656c6c6f20576f726c64";
}

try {
  if (testCode()) {
    console.log("esnext.Uint8Array.toHex.js: OK");
  } else {
    console.log("esnext.Uint8Array.toHex.js: FAIL");
  }
} catch (e) {
  console.log("esnext.Uint8Array.toHex.js: FAIL: " + e);
}