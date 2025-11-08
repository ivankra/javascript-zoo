// compat-table: ES6 > functions > class (large) > computed names, temporal dead zone
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  try {
    var B = class C {
      [C](){}
    }
  } catch(e) {
    return true;
  }
}

try {
  if (testCode()) {
    console.log("kangax-es6/class.computed-names-tdz.js: OK");
  } else {
    console.log("kangax-es6/class.computed-names-tdz.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/class.computed-names-tdz.js: exception: " + e);
}
