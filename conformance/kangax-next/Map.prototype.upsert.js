// compat-table: ES Next > Stage 2.7 > Map.prototype.upsert (small) > Map.prototype.upsert
// spec: https://github.com/tc39/proposal-upsert
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  const map = new Map([['a', 1]]);
  if (map.upsert('a', it => 2, () => 3) !== 2) return false;
  if (map.upsert('b', it => 2, () => 3) !== 3) return false;
  return Array.from(map).join() === 'a,2,b,3';
}

try {
  if (testCode()) {
    console.log("kangax-next/Map.prototype.upsert.js: OK");
  } else {
    console.log("kangax-next/Map.prototype.upsert.js: failed");
  }
} catch (e) {
  console.log("kangax-next/Map.prototype.upsert.js: exception: " + e);
}
