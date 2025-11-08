// compat-table: ES6 > built-ins > Reflect (small) > Reflect.construct creates instances from third argument
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-reflection
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  function F(){}
  var obj = Reflect.construct(function(){ this.y = 1; }, [], F);
  return obj.y === 1 && obj instanceof F;
}

try {
  if (testCode()) {
    console.log("kangax-es6/Reflect.construct.third-argument.js: OK");
  } else {
    console.log("kangax-es6/Reflect.construct.third-argument.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Reflect.construct.third-argument.js: exception: " + e);
}
