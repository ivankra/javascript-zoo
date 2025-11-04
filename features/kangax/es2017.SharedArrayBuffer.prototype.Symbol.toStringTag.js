// ES6: https://tc39.github.io/ecma262/#sec-sharedarraybuffer.prototype.toString
// compat-table: ES2016+ > 2017 features > shared memory and atomics (medium) > SharedArrayBuffer.prototype[Symbol.toStringTag]
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return SharedArrayBuffer.prototype[Symbol.toStringTag] === 'SharedArrayBuffer';
}

try {
  if (testCode()) {
    console.log("es2017.SharedArrayBuffer.prototype.Symbol.toStringTag.js: OK");
  } else {
    console.log("es2017.SharedArrayBuffer.prototype.Symbol.toStringTag.js: FAIL");
  }
} catch (e) {
  console.log("es2017.SharedArrayBuffer.prototype.Symbol.toStringTag.js: FAIL: " + e);
}