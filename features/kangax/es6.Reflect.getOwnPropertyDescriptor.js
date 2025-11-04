// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-reflection
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getOwnPropertyDescriptor
// compat-table: ES6 > built-ins > Reflect (small) > Reflect.getOwnPropertyDescriptor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var obj = { baz: 789 };
  var desc = Reflect.getOwnPropertyDescriptor(obj, "baz");
  return desc.value === 789 &&
    desc.configurable && desc.writable && desc.enumerable;
}

try {
  if (testCode()) {
    console.log("es6.Reflect.getOwnPropertyDescriptor.js: OK");
  } else {
    console.log("es6.Reflect.getOwnPropertyDescriptor.js: FAIL");
  }
} catch (e) {
  console.log("es6.Reflect.getOwnPropertyDescriptor.js: FAIL: " + e);
}