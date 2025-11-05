// compat-table: ES5 > Miscellaneous (medium) > Arguments toStringTag is "Arguments"
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return (function(){ return Object.prototype.toString.call(arguments) === '[object Arguments]'; }());
}

try {
  if (testCode()) {
    console.log("kangax-es5/misc.Arguments.toStringTag.js: OK");
  } else {
    console.log("kangax-es5/misc.Arguments.toStringTag.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/misc.Arguments.toStringTag.js: exception: " + e);
}
