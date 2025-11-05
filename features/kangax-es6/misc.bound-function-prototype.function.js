// compat-table: ES6 > misc > prototype of bound functions (tiny) > basic functions
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-boundfunctioncreate
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  function correctProtoBound(proto) {
    var f = function(){};
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
    console.log("kangax-es6/misc.bound-function-prototype.function.js: OK");
  } else {
    console.log("kangax-es6/misc.bound-function-prototype.function.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.bound-function-prototype.function.js: exception: " + e);
}
