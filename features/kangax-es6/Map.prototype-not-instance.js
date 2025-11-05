// compat-table: ES6 > built-ins > Map (medium) > Map.prototype isn't an instance
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-map-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  new Map();
  var obj = {};
  try {
    Map.prototype.has(obj);
  }
  catch(e) {
    return true;
  }
}

try {
  if (testCode()) {
    console.log("kangax-es6/Map.prototype-not-instance.js: OK");
  } else {
    console.log("kangax-es6/Map.prototype-not-instance.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Map.prototype-not-instance.js: exception: " + e);
}
