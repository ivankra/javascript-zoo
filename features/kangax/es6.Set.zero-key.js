// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-set-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
// compat-table: ES6 > built-ins > Set (medium) > -0 key converts to +0
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var set = new Set();
  set.add(-0);
  var k;
  set.forEach(function (value) {
    k = 1 / value;
  });
  return k === Infinity && set.has(+0);
}

try {
  if (testCode()) {
    console.log("es6.Set.zero-key.js: OK");
  } else {
    console.log("es6.Set.zero-key.js: FAIL");
  }
} catch (e) {
  console.log("es6.Set.zero-key.js: FAIL: " + e);
}