// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
// compat-table: ES6 > built-ins > Promise (large) > Promise.prototype isn't an instance
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
    console.log("es6.Promise.prototype-not-instance.js: OK");
  } else {
    console.log("es6.Promise.prototype-not-instance.js: FAIL");
  }
} catch (e) {
  console.log("es6.Promise.prototype-not-instance.js: FAIL: " + e);
}