// compat-table: ES5 > Immutable globals (small) > Infinity
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  Infinity = false;
  var result = typeof Infinity === 'number';
  Infinity = 1/0;
  return result;
}

try {
  if (testCode()) {
    console.log("kangax-es5/immutable-globals.Infinity.js: OK");
  } else {
    console.log("kangax-es5/immutable-globals.Infinity.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/immutable-globals.Infinity.js: exception: " + e);
}
