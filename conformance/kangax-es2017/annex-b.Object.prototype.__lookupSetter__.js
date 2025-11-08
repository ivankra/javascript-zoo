// compat-table: ES2016+ > 2017 annex b > Object.prototype getter/setter methods (tiny) > __lookupSetter__
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/__lookupSetter__
// spec: https://tc39.github.io/ecma262/#sec-object.prototype.__defineGetter__
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var obj = {
    set foo(baz) { return "bar"; },
    qux: 1
  };
  var foo = Object.prototype.__lookupSetter__.call(obj, "foo");
  return foo() === "bar"
    && Object.prototype.__lookupSetter__.call(obj, "qux") === void undefined
    && Object.prototype.__lookupSetter__.call(obj, "baz") === void undefined;
}

try {
  if (testCode()) {
    console.log("kangax-es2017/annex-b.Object.prototype.__lookupSetter__.js: OK");
  } else {
    console.log("kangax-es2017/annex-b.Object.prototype.__lookupSetter__.js: failed");
  }
} catch (e) {
  console.log("kangax-es2017/annex-b.Object.prototype.__lookupSetter__.js: exception: " + e);
}
