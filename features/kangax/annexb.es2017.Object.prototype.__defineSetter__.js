// ES6: https://tc39.github.io/ecma262/#sec-object.prototype.__defineGetter__
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/__defineSetter__
// compat-table: ES2016+ > 2017 annex b > Object.prototype getter/setter methods (tiny) > __defineSetter__
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var obj = {};
  function bar() {}
  Object.prototype.__defineSetter__.call(obj, "foo", bar);
  var prop = Object.getOwnPropertyDescriptor(obj, "foo");
  return prop.set === bar && !prop.writable && prop.configurable
  && prop.enumerable;
}

try {
  if (testCode()) {
    console.log("annexb.es2017.Object.prototype.__defineSetter__.js: OK");
  } else {
    console.log("annexb.es2017.Object.prototype.__defineSetter__.js: FAIL");
  }
} catch (e) {
  console.log("annexb.es2017.Object.prototype.__defineSetter__.js: FAIL: " + e);
}