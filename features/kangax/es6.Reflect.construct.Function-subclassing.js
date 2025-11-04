// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-reflection
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect
// compat-table: ES6 > built-ins > Reflect (small) > Reflect.construct, Function subclassing
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  function F(){}
  var obj = Reflect.construct(Function, ["return 2"], F);
  return obj() === 2 && obj instanceof F;
}

try {
  if (testCode()) {
    console.log("es6.Reflect.construct.Function-subclassing.js: OK");
  } else {
    console.log("es6.Reflect.construct.Function-subclassing.js: FAIL");
  }
} catch (e) {
  console.log("es6.Reflect.construct.Function-subclassing.js: FAIL: " + e);
}