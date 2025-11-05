// compat-table: ES6 > syntax > RegExp "y" and "u" flags (medium) > "y" flag
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Parameters
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-get-regexp.prototype.sticky
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var re = new RegExp('\\w', 'y');
  re.exec('xy');
  return (re.exec('xy')[0] === 'y');
}

try {
  if (testCode()) {
    console.log("kangax-es6/regex.flags.y.js: OK");
  } else {
    console.log("kangax-es6/regex.flags.y.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/regex.flags.y.js: exception: " + e);
}
