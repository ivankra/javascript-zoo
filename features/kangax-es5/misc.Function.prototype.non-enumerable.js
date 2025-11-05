// compat-table: ES5 > Miscellaneous (medium) > Function "prototype" property is non-enumerable
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return !Function().propertyIsEnumerable('prototype');
}

try {
  if (testCode()) {
    console.log("kangax-es5/misc.Function.prototype.non-enumerable.js: OK");
  } else {
    console.log("kangax-es5/misc.Function.prototype.non-enumerable.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/misc.Function.prototype.non-enumerable.js: exception: " + e);
}
