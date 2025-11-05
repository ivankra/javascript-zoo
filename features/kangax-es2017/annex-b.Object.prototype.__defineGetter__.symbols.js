// compat-table: ES2016+ > 2017 annex b > Object.prototype getter/setter methods (tiny) > __defineGetter__, symbols
// spec: https://tc39.github.io/ecma262/#sec-object.prototype.__defineGetter__
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var obj = {};
  var sym = Symbol();
  function bar() { return "bar"; }
  Object.prototype.__defineGetter__.call(obj, sym, bar);
  var prop = Object.getOwnPropertyDescriptor(obj, sym);
  return prop.get === bar && !prop.writable && prop.configurable
  && prop.enumerable;
}

try {
  if (testCode()) {
    console.log("kangax-es2017/annex-b.Object.prototype.__defineGetter__.symbols.js: OK");
  } else {
    console.log("kangax-es2017/annex-b.Object.prototype.__defineGetter__.symbols.js: failed");
  }
} catch (e) {
  console.log("kangax-es2017/annex-b.Object.prototype.__defineGetter__.symbols.js: exception: " + e);
}
