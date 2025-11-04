// ES6: https://github.com/tc39/proposal-arraybuffer-transfer
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/detached
// compat-table: ES2016+ > 2024 features > ArrayBuffer.prototype.transfer (small) > ArrayBuffer.prototype.detached
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  const buffer1 = new Uint8Array([1, 2]).buffer;
  const buffer2 = buffer1.transfer();
  return buffer1.detached && !buffer2.detached;
}

try {
  if (testCode()) {
    console.log("es2024.ArrayBuffer.prototype.detached.js: OK");
  } else {
    console.log("es2024.ArrayBuffer.prototype.detached.js: FAIL");
  }
} catch (e) {
  console.log("es2024.ArrayBuffer.prototype.detached.js: FAIL: " + e);
}