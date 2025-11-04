// ES6: https://github.com/tc39/Function-prototype-toString-revision
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/toString
// compat-table: ES2016+ > 2019 misc > Function.prototype.toString revision (small) > class expression with explicit constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var str = 'class /\x2A a \x2A/ A /\x2A b \x2A/ extends /\x2A c \x2A/ function B() {} /\x2A d \x2A/ { /\x2A e \x2A/ constructor /\x2A f \x2A/ ( /\x2A g \x2A/ ) /\x2A h \x2A/ { /\x2A i \x2A/ ; /\x2A j \x2A/ } /\x2A k \x2A/ m /\x2A l \x2A/ ( /\x2A m \x2A/ ) /\x2A n \x2A/ { /\x2A o \x2A/ } /\x2A p \x2A/ }';
  return eval('(/\x2A before \x2A/' + str + '/\x2A after \x2A/)') + '' === str;
}

try {
  if (testCode()) {
    console.log("es2019.misc.Function-toString.class-explicit-constructor.js: OK");
  } else {
    console.log("es2019.misc.Function-toString.class-explicit-constructor.js: FAIL");
  }
} catch (e) {
  console.log("es2019.misc.Function-toString.class-explicit-constructor.js: FAIL: " + e);
}