// compat-table: ES6 > built-ins > Set (medium) > Set.prototype isn't an instance
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-set-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  new Set();
  var obj = {};
  try {
    Set.prototype.has(obj);
  }
  catch(e) {
    return true;
  }
}

try {
  if (testCode()) {
    console.log("kangax-es6/Set.prototype-not-instance.js: OK");
  } else {
    console.log("kangax-es6/Set.prototype-not-instance.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Set.prototype-not-instance.js: exception: " + e);
}
