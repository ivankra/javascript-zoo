// compat-table: ES6 > built-ins > Promise (large) > Promise.prototype isn't an instance
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  new Promise(function(){});
  try {
    Promise.prototype.then(function(){});
  } catch (e) {
    return true;
  }
}

try {
  if (testCode()) {
    console.log("kangax-es6/Promise.prototype-not-instance.js: OK");
  } else {
    console.log("kangax-es6/Promise.prototype-not-instance.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Promise.prototype-not-instance.js: exception: " + e);
}
