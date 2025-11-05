// compat-table: ES6 > built-ins > Reflect (small) > Reflect.ownKeys, string keys
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-reflection
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var obj = Object.create({ C: true });
  obj.A = true;
  Object.defineProperty(obj, 'B', { value: true, enumerable: false });

  return Reflect.ownKeys(obj).sort() + '' === "A,B";
}

try {
  if (testCode()) {
    console.log("kangax-es6/Reflect.ownKeys.string.js: OK");
  } else {
    console.log("kangax-es6/Reflect.ownKeys.string.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Reflect.ownKeys.string.js: exception: " + e);
}
