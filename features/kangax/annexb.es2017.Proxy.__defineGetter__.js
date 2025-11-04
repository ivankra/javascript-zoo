// ES6: https://tc39.github.io/ecma262/#sec-object.prototype.__defineGetter__
// compat-table: ES2016+ > 2017 annex b > Proxy internal calls, getter/setter methods (tiny) > __defineGetter__
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Object.prototype.__defineGetter__ -> DefinePropertyOrThrow -> [[DefineOwnProperty]]
  var def = [];
  var p = new Proxy({}, {
    defineProperty: function (o, v, desc) {
      def.push(v);
      Object.defineProperty(o, v, desc);
      return true;
    }
  });
  Object.prototype.__defineGetter__.call(p, "foo", Object);
  return def + '' === "foo";
}

try {
  if (testCode()) {
    console.log("annexb.es2017.Proxy.__defineGetter__.js: OK");
  } else {
    console.log("annexb.es2017.Proxy.__defineGetter__.js: FAIL");
  }
} catch (e) {
  console.log("annexb.es2017.Proxy.__defineGetter__.js: FAIL: " + e);
}