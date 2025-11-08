// compat-table: ES6 > misc > prototype of bound functions (tiny) > classes
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-boundfunctioncreate
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  function correctProtoBound(proto) {
    class C {}
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(C, proto);
    } else {
      C.__proto__ = proto;
    }
    var boundF = Function.prototype.bind.call(C, null);
    return Object.getPrototypeOf(boundF) === proto;
  }
  return correctProtoBound(Function.prototype)
    && correctProtoBound({})
    && correctProtoBound(null);
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.bound-function-prototype.class.js: OK");
  } else {
    console.log("kangax-es6/misc.bound-function-prototype.class.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.bound-function-prototype.class.js: exception: " + e);
}
