// compat-table: ES Next > Stage 2.7 > Map.prototype.upsert (small) > WeakMap.prototype.upsert
// spec: https://github.com/tc39/proposal-upsert
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  const a = {}, b = {};
  const map = new WeakMap([[a, 1]]);
  if (map.upsert(a, it => 2, () => 3) !== 2) return false;
  if (map.upsert(b, it => 2, () => 3) !== 3) return false;
  return map.get(a) === 2 && map.get(b) === 3;
}

try {
  if (testCode()) {
    console.log("kangax-next/WeakMap.prototype.upsert.js: OK");
  } else {
    console.log("kangax-next/WeakMap.prototype.upsert.js: failed");
  }
} catch (e) {
  console.log("kangax-next/WeakMap.prototype.upsert.js: exception: " + e);
}
