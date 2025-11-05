// compat-table: ES2016+ > 2019 features > Array.prototype.{flat, flatMap} (medium) > flat and flatMap in Array.prototype[@@unscopables]
// spec: https://tc39.github.io/proposal-flatMap/
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Array.prototype[Symbol.unscopables].flat
    && Array.prototype[Symbol.unscopables].flatMap;
}

try {
  if (testCode()) {
    console.log("kangax-es2019/Array.prototype.flat-flatMap.unscopables.js: OK");
  } else {
    console.log("kangax-es2019/Array.prototype.flat-flatMap.unscopables.js: failed");
  }
} catch (e) {
  console.log("kangax-es2019/Array.prototype.flat-flatMap.unscopables.js: exception: " + e);
}
