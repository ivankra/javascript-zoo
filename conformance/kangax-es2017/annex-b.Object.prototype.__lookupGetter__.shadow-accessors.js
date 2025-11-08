// compat-table: ES2016+ > 2017 annex b > Object.prototype getter/setter methods (tiny) > __lookupGetter__, data properties can shadow accessors
// spec: https://tc39.github.io/ecma262/#sec-object.prototype.__defineGetter__
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var a = {};
  var b = Object.create(a);
  b.foo = 1;
  a.__defineGetter__("foo", function () {});
  return b.__lookupGetter__("foo") === void undefined;
}

try {
  if (testCode()) {
    console.log("kangax-es2017/annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js: OK");
  } else {
    console.log("kangax-es2017/annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js: failed");
  }
} catch (e) {
  console.log("kangax-es2017/annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js: exception: " + e);
}
