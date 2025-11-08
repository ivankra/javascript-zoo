// compat-table: ES6 > built-in extensions > function "name" property (small) > variables (class)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-setfunctionname
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var foo = class {};
  var bar = class baz {};
  var qux = class { static name() {} };
  return foo.name === "foo" &&
         bar.name === "baz" &&
         typeof qux.name === "function";
}

try {
  if (testCode()) {
    console.log("kangax-es6/Function.name.class-variable.js: OK");
  } else {
    console.log("kangax-es6/Function.name.class-variable.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Function.name.class-variable.js: exception: " + e);
}
