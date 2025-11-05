// compat-table: ES6 > built-in extensions > function "name" property (small) > isn't writable, is configurable
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-setfunctionname
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var descriptor = Object.getOwnPropertyDescriptor(function f(){},"name");
  return descriptor.enumerable   === false &&
         descriptor.writable     === false &&
         descriptor.configurable === true;
}

try {
  if (testCode()) {
    console.log("kangax-es6/Function.name.configurable.js: OK");
  } else {
    console.log("kangax-es6/Function.name.configurable.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Function.name.configurable.js: exception: " + e);
}
