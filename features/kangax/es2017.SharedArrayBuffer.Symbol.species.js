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
    console.log("es2017.SharedArrayBuffer.Symbol.species.js: OK");
  } else {
    console.log("es2017.SharedArrayBuffer.Symbol.species.js: FAIL");
  }
} catch (e) {
  console.log("es2017.SharedArrayBuffer.Symbol.species.js: FAIL: " + e);
}