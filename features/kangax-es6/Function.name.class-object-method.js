// compat-table: ES6 > built-in extensions > function "name" property (small) > object methods (class)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-setfunctionname
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var o = { foo: class {}, bar: class baz {}};
  o.qux = class {};
  return o.foo.name === "foo" &&
         o.bar.name === "baz" &&
         o.qux.name === "";
}

try {
  if (testCode()) {
    console.log("kangax-es6/Function.name.class-object-method.js: OK");
  } else {
    console.log("kangax-es6/Function.name.class-object-method.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Function.name.class-object-method.js: exception: " + e);
}
