// compat-table: ES2016+ > 2017 features > shared memory and atomics (medium) > SharedArrayBuffer[Symbol.species]
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return SharedArrayBuffer[Symbol.species] === SharedArrayBuffer;
}

try {
  if (testCode()) {
    console.log("kangax-es2017/SharedArrayBuffer.Symbol.species.js: OK");
  } else {
    console.log("kangax-es2017/SharedArrayBuffer.Symbol.species.js: failed");
  }
} catch (e) {
  console.log("kangax-es2017/SharedArrayBuffer.Symbol.species.js: exception: " + e);
}
