// compat-table: ES2016+ > 2019 misc > Function.prototype.toString revision (small) > unicode escape sequences in identifiers
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/toString
// spec: https://github.com/tc39/Function-prototype-toString-revision
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var str = 'function \\u0061(\\u{62}, \\u0063) { \\u0062 = \\u{00063}; return b; }';
  return eval('(/\x2A before \x2A/' + str + '/\x2A after \x2A/)') + '' === str;
}

try {
  if (testCode()) {
    console.log("kangax-es2019/misc.Function-toString.unicode-escapes.js: OK");
  } else {
    console.log("kangax-es2019/misc.Function-toString.unicode-escapes.js: failed");
  }
} catch (e) {
  console.log("kangax-es2019/misc.Function-toString.unicode-escapes.js: exception: " + e);
}
