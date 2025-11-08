// compat-table: ES2016+ > 2019 misc > Function.prototype.toString revision (small) > functions created with the Function constructor
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/toString
// spec: https://github.com/tc39/Function-prototype-toString-revision
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var fn = Function('a', ' /\x2A a \x2A/ b, c /\x2A b \x2A/ //', '/\x2A c \x2A/ ; /\x2A d \x2A/ //');
  var str = 'function anonymous(a, /\x2A a \x2A/ b, c /\x2A b \x2A/ //\n) {\n/\x2A c \x2A/ ; /\x2A d \x2A/ //\n}';
  return fn + '' === str;
}

try {
  if (testCode()) {
    console.log("kangax-es2019/misc.Function-toString.Function-constructor.js: OK");
  } else {
    console.log("kangax-es2019/misc.Function-toString.Function-constructor.js: failed");
  }
} catch (e) {
  console.log("kangax-es2019/misc.Function-toString.Function-constructor.js: exception: " + e);
}
