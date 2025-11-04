// ES6: https://tc39.github.io/ecma262/#sec-object.prototype.__defineGetter__
// compat-table: ES2016+ > 2017 annex b > Object.prototype getter/setter methods (tiny) > __lookupGetter__, symbols
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var sym = Symbol();
  var sym2 = Symbol();
  var obj = {};
  Object.defineProperty(obj, sym, { get: function () { return "bar"; }});
  Object.defineProperty(obj, sym2, { value: 1 });
  var foo = Object.prototype.__lookupGetter__.call(obj, sym);
  return foo() === "bar"
    && Object.prototype.__lookupGetter__.call(obj, sym2) === void undefined
    && Object.prototype.__lookupGetter__.call(obj, Symbol()) === void undefined;
}

try {
  if (testCode()) {
    console.log("annexb.es2017.Object.prototype.__lookupGetter__.symbols.js: OK");
  } else {
    console.log("annexb.es2017.Object.prototype.__lookupGetter__.symbols.js: FAIL");
  }
} catch (e) {
  console.log("annexb.es2017.Object.prototype.__lookupGetter__.symbols.js: FAIL: " + e);
}