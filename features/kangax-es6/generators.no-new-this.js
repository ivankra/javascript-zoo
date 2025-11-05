// compat-table: ES6 > functions > generators (large) > can't use "this" with new
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-generator-function-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  function * generator(){
    yield this.x; yield this.y;
  };
  try {
    (new generator()).next();
  }
  catch (e) {
    return true;
  }
}

try {
  if (testCode()) {
    console.log("kangax-es6/generators.no-new-this.js: OK");
  } else {
    console.log("kangax-es6/generators.no-new-this.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/generators.no-new-this.js: exception: " + e);
}
