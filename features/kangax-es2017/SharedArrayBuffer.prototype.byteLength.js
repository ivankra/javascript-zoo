// compat-table: ES2016+ > 2017 features > shared memory and atomics (medium) > SharedArrayBuffer.prototype.byteLength
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer/byteLength
// spec: https://tc39.github.io/ecma262/#sec-get-sharedarraybuffer.prototype.bytelength
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return 'byteLength' in SharedArrayBuffer.prototype;
}

try {
  if (testCode()) {
    console.log("kangax-es2017/SharedArrayBuffer.prototype.byteLength.js: OK");
  } else {
    console.log("kangax-es2017/SharedArrayBuffer.prototype.byteLength.js: failed");
  }
} catch (e) {
  console.log("kangax-es2017/SharedArrayBuffer.prototype.byteLength.js: exception: " + e);
}
