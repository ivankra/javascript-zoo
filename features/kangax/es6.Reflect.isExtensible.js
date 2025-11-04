// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-reflection
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/isExtensible
// compat-table: ES6 > built-ins > Reflect (small) > Reflect.isExtensible
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Reflect.isExtensible({}) &&
    !Reflect.isExtensible(Object.preventExtensions({}));
}

try {
  if (testCode()) {
    console.log("es6.Reflect.isExtensible.js: OK");
  } else {
    console.log("es6.Reflect.isExtensible.js: FAIL");
  }
} catch (e) {
  console.log("es6.Reflect.isExtensible.js: FAIL: " + e);
}