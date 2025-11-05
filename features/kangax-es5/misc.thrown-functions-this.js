// compat-table: ES5 > Miscellaneous (medium) > Thrown functions have proper "this" values
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  try {
    throw function() { return !('a' in this); };
  }
  catch(e) {
    var a = true;
    return e();
  }
}

try {
  if (testCode()) {
    console.log("kangax-es5/misc.thrown-functions-this.js: OK");
  } else {
    console.log("kangax-es5/misc.thrown-functions-this.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/misc.thrown-functions-this.js: exception: " + e);
}
