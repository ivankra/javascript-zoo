// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-reflection
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/set
// compat-table: ES6 > built-ins > Reflect (small) > Reflect.set
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var obj = {};
  Reflect.set(obj, "quux", 654);
  return obj.quux === 654;
}

try {
  if (testCode()) {
    console.log("es6.Reflect.set.js: OK");
  } else {
    console.log("es6.Reflect.set.js: FAIL");
  }
} catch (e) {
  console.log("es6.Reflect.set.js: FAIL: " + e);
}