// compat-table: ES6 > built-ins > Map (medium) > -0 key converts to +0
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-map-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var map = new Map();
  map.set(-0, "foo");
  var k;
  map.forEach(function (value, key) {
    k = 1 / key;
  });
  return k === Infinity && map.get(+0) === "foo";
}

try {
  if (testCode()) {
    console.log("kangax-es6/Map.zero-key.js: OK");
  } else {
    console.log("kangax-es6/Map.zero-key.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Map.zero-key.js: exception: " + e);
}
