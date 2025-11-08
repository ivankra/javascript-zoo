// compat-table: ES5 > Immutable globals (small) > NaN
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  NaN = false;
  var result = typeof NaN === 'number';
  NaN = Math.sqrt(-1);
  return result;
}

try {
  if (testCode()) {
    console.log("kangax-es5/immutable-globals.NaN.js: OK");
  } else {
    console.log("kangax-es5/immutable-globals.NaN.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/immutable-globals.NaN.js: exception: " + e);
}
