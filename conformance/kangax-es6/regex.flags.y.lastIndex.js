// compat-table: ES6 > syntax > RegExp "y" and "u" flags (medium) > "y" flag, lastIndex
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Parameters
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-get-regexp.prototype.sticky
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var re = new RegExp('yy', 'y');
  re.lastIndex = 3;
  var result = re.exec('xxxyyxx')[0];
  return result === 'yy' && re.lastIndex === 5;
}

try {
  if (testCode()) {
    console.log("kangax-es6/regex.flags.y.lastIndex.js: OK");
  } else {
    console.log("kangax-es6/regex.flags.y.lastIndex.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/regex.flags.y.lastIndex.js: exception: " + e);
}
