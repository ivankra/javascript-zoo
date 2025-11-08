// compat-table: ES2016+ > 2017 annex b > Object.prototype getter/setter methods (tiny) > __lookupSetter__, symbols
// spec: https://tc39.github.io/ecma262/#sec-object.prototype.__defineGetter__
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var sym = Symbol();
  var sym2 = Symbol();
  var obj = {};
  Object.defineProperty(obj, sym, { set: function (baz) { return "bar"; }});
  Object.defineProperty(obj, sym2, { value: 1 });
  var foo = Object.prototype.__lookupSetter__.call(obj, sym);
  return foo() === "bar"
    && Object.prototype.__lookupSetter__.call(obj, sym2) === void undefined
    && Object.prototype.__lookupSetter__.call(obj, Symbol()) === void undefined;
}

try {
  if (testCode()) {
    console.log("kangax-es2017/annex-b.Object.prototype.__lookupSetter__.symbols.js: OK");
  } else {
    console.log("kangax-es2017/annex-b.Object.prototype.__lookupSetter__.symbols.js: failed");
  }
} catch (e) {
  console.log("kangax-es2017/annex-b.Object.prototype.__lookupSetter__.symbols.js: exception: " + e);
}
