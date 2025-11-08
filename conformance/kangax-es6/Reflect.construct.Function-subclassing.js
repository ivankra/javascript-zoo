// compat-table: ES6 > built-ins > Reflect (small) > Reflect.construct, Function subclassing
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-reflection
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
    console.log("kangax-es6/Reflect.construct.Function-subclassing.js: OK");
  } else {
    console.log("kangax-es6/Reflect.construct.Function-subclassing.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Reflect.construct.Function-subclassing.js: exception: " + e);
}
