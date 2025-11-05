// compat-table: ES6 > built-ins > Reflect (small) > Reflect.preventExtensions
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/preventExtensions
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-reflection
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var obj = {};
  Reflect.preventExtensions(obj);
  return !Object.isExtensible(obj);
}

try {
  if (testCode()) {
    console.log("kangax-es6/Reflect.preventExtensions.js: OK");
  } else {
    console.log("kangax-es6/Reflect.preventExtensions.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Reflect.preventExtensions.js: exception: " + e);
}
