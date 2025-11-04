// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-weakmap-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
// compat-table: ES6 > built-ins > WeakMap (medium) > WeakMap.prototype isn't an instance
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  new WeakMap();
  var obj = {};
  try {
    WeakMap.prototype.has(obj);
  }
  catch(e) {
    return true;
  }
}

try {
  if (testCode()) {
    console.log("es6.WeakMap.prototype-not-instance.js: OK");
  } else {
    console.log("es6.WeakMap.prototype-not-instance.js: FAIL");
  }
} catch (e) {
  console.log("es6.WeakMap.prototype-not-instance.js: FAIL: " + e);
}