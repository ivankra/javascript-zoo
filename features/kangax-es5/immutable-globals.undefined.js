// compat-table: ES5 > Immutable globals (small) > undefined
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  undefined = 12345;
  var result = typeof undefined === 'undefined';
  undefined = void 0;
  return result;
}

try {
  if (testCode()) {
    console.log("kangax-es5/immutable-globals.undefined.js: OK");
  } else {
    console.log("kangax-es5/immutable-globals.undefined.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/immutable-globals.undefined.js: exception: " + e);
}
