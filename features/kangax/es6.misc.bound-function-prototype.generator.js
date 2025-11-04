// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-boundfunctioncreate
// compat-table: ES6 > misc > prototype of bound functions (tiny) > generator functions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  function correctProtoBound(proto) {
    var f = function*(){};
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(f, proto);
    } else {
      f.__proto__ = proto;
    }
    var boundF = Function.prototype.bind.call(f, null);
    return Object.getPrototypeOf(boundF) === proto;
  }
  return correctProtoBound(Function.prototype)
    && correctProtoBound({})
    && correctProtoBound(null);
}

try {
  if (testCode()) {
    console.log("es6.misc.bound-function-prototype.generator.js: OK");
  } else {
    console.log("es6.misc.bound-function-prototype.generator.js: FAIL");
  }
} catch (e) {
  console.log("es6.misc.bound-function-prototype.generator.js: FAIL: " + e);
}