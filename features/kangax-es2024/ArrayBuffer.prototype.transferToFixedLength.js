// compat-table: ES2016+ > 2024 features > ArrayBuffer.prototype.transfer (small) > ArrayBuffer.prototype.transferToFixedLength()
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/transferToFixedLength
// spec: https://github.com/tc39/proposal-arraybuffer-transfer
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  const buffer1 = new Uint8Array([1, 2]).buffer;
  const buffer2 = buffer1.transferToFixedLength();
  return buffer1.byteLength === 0
    && buffer2.byteLength === 2;
}

try {
  if (testCode()) {
    console.log("kangax-es2024/ArrayBuffer.prototype.transferToFixedLength.js: OK");
  } else {
    console.log("kangax-es2024/ArrayBuffer.prototype.transferToFixedLength.js: failed");
  }
} catch (e) {
  console.log("kangax-es2024/ArrayBuffer.prototype.transferToFixedLength.js: exception: " + e);
}
