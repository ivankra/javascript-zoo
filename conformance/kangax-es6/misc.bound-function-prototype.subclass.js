// compat-table: ES6 > misc > prototype of bound functions (tiny) > subclasses
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-boundfunctioncreate
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  function correctProtoBound(superclass) {
    class C extends superclass {
      constructor() {
        return Object.create(null);
      }
    }
    var boundF = Function.prototype.bind.call(C, null);
    return Object.getPrototypeOf(boundF) === Object.getPrototypeOf(C);
  }
  return correctProtoBound(function(){})
    && correctProtoBound(Array)
    && correctProtoBound(null);
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.bound-function-prototype.subclass.js: OK");
  } else {
    console.log("kangax-es6/misc.bound-function-prototype.subclass.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.bound-function-prototype.subclass.js: exception: " + e);
}
