// compat-table: ES5 > Array methods (large) > Array.prototype.unshift: [].unshift(0) returns the unshifted count
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return [].unshift(0) === 1;
}

try {
  if (testCode()) {
    console.log("kangax-es5/Array.prototype.unshift.return-count.js: OK");
  } else {
    console.log("kangax-es5/Array.prototype.unshift.return-count.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/Array.prototype.unshift.return-count.js: exception: " + e);
}
