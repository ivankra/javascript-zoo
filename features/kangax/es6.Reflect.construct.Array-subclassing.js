// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-reflection
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect
// compat-table: ES6 > built-ins > Reflect (small) > Reflect.construct, Array subclassing
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  function F(){}
  var obj = Reflect.construct(Array, [], F);
  obj[2] = 'foo';
  return obj.length === 3 && obj instanceof F;
}

try {
  if (testCode()) {
    console.log("es6.Reflect.construct.Array-subclassing.js: OK");
  } else {
    console.log("es6.Reflect.construct.Array-subclassing.js: FAIL");
  }
} catch (e) {
  console.log("es6.Reflect.construct.Array-subclassing.js: FAIL: " + e);
}