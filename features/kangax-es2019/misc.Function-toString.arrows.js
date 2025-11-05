// compat-table: ES2016+ > 2019 misc > Function.prototype.toString revision (small) > arrows
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/toString
// spec: https://github.com/tc39/Function-prototype-toString-revision
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var str = 'a => b';
  return eval('(' + str + ')') + '' === str;
}

try {
  if (testCode()) {
    console.log("kangax-es2019/misc.Function-toString.arrows.js: OK");
  } else {
    console.log("kangax-es2019/misc.Function-toString.arrows.js: failed");
  }
} catch (e) {
  console.log("kangax-es2019/misc.Function-toString.arrows.js: exception: " + e);
}
