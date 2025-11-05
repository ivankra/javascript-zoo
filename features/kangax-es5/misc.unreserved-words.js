// compat-table: ES5 > Miscellaneous (medium) > Unreserved words
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var abstract, boolean, byte, char, double, final, float, goto, int, long,
    native, short, synchronized, transient, volatile;
  return true;
}

try {
  if (testCode()) {
    console.log("kangax-es5/misc.unreserved-words.js: OK");
  } else {
    console.log("kangax-es5/misc.unreserved-words.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/misc.unreserved-words.js: exception: " + e);
}
