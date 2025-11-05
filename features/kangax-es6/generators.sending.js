// compat-table: ES6 > functions > generators (large) > sending
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-generator-function-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var sent;
  function * generator(){
    sent = [yield 5, yield 6];
  };
  var iterator = generator();
  iterator.next();
  iterator.next("foo");
  iterator.next("bar");
  return sent[0] === "foo" && sent[1] === "bar";
}

try {
  if (testCode()) {
    console.log("kangax-es6/generators.sending.js: OK");
  } else {
    console.log("kangax-es6/generators.sending.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/generators.sending.js: exception: " + e);
}
