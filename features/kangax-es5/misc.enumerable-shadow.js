// compat-table: ES5 > Miscellaneous (medium) > Enumerable properties can be shadowed by non-enumerables
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var result = true;
  Object.prototype.length = 42;
  for (var i in Function) {
      if (i === 'length') {
          result = false;
      }
  }
  delete Object.prototype.length;
  return result;
}

try {
  if (testCode()) {
    console.log("kangax-es5/misc.enumerable-shadow.js: OK");
  } else {
    console.log("kangax-es5/misc.enumerable-shadow.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/misc.enumerable-shadow.js: exception: " + e);
}
