// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-reflection
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys
// compat-table: ES6 > built-ins > Reflect (small) > Reflect.ownKeys, symbol keys
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var s1 = Symbol(), s2 = Symbol(), s3 = Symbol();
  var proto = {};
  proto[s1] = true;
  var obj = Object.create(proto);
  obj[s2] = true;
  Object.defineProperty(obj, s3, { value: true, enumerable: false });

  var keys = Reflect.ownKeys(obj);
  return keys.indexOf(s2) >-1 && keys.indexOf(s3) >-1 && keys.length === 2;
}

try {
  if (testCode()) {
    console.log("es6.Reflect.ownKeys.symbol.js: OK");
  } else {
    console.log("es6.Reflect.ownKeys.symbol.js: FAIL");
  }
} catch (e) {
  console.log("es6.Reflect.ownKeys.symbol.js: FAIL: " + e);
}