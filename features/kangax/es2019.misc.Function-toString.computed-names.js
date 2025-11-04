// ES6: https://github.com/tc39/Function-prototype-toString-revision
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/toString
// compat-table: ES2016+ > 2019 misc > Function.prototype.toString revision (small) > methods and computed property names
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var str = '[ /\x2A a \x2A/ "f" /\x2A b \x2A/ ] /\x2A c \x2A/ ( /\x2A d \x2A/ ) /\x2A e \x2A/ { /\x2A f \x2A/ }';
  return eval('({ /\x2A before \x2A/' + str + '/\x2A after \x2A/ }.f)') + '' === str;
}

try {
  if (testCode()) {
    console.log("es2019.misc.Function-toString.computed-names.js: OK");
  } else {
    console.log("es2019.misc.Function-toString.computed-names.js: FAIL");
  }
} catch (e) {
  console.log("es2019.misc.Function-toString.computed-names.js: FAIL: " + e);
}