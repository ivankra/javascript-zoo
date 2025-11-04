// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-reflection
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect
// compat-table: ES6 > built-ins > Reflect (small) > Reflect.construct, RegExp subclassing
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  function F(){}
  var obj = Reflect.construct(RegExp, ["baz","g"], F);
  return RegExp.prototype.exec.call(obj, "foobarbaz")[0] === "baz"
    && obj.lastIndex === 9 && obj instanceof F;
}

try {
  if (testCode()) {
    console.log("es6.Reflect.construct.RegExp-subclassing.js: OK");
  } else {
    console.log("es6.Reflect.construct.RegExp-subclassing.js: FAIL");
  }
} catch (e) {
  console.log("es6.Reflect.construct.RegExp-subclassing.js: FAIL: " + e);
}