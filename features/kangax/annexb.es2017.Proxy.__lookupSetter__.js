// ES6: https://tc39.github.io/ecma262/#sec-object.prototype.__defineGetter__
// compat-table: ES2016+ > 2017 annex b > Proxy internal calls, getter/setter methods (tiny) > __lookupSetter__
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Object.prototype.__lookupSetter__ -> [[GetOwnProperty]]
  // Object.prototype.__lookupSetter__ -> [[GetPrototypeOf]]
  var gopd = [];
  var gpo = false;
  var p = new Proxy({}, {
    getPrototypeOf: function (o) {
      gpo = true;
      return Object.getPrototypeOf(o);
    },
    getOwnPropertyDescriptor: function (o, v) {
      gopd.push(v);
      return Object.getOwnPropertyDescriptor(o, v);
    }
  });
  Object.prototype.__lookupSetter__.call(p, "foo");
  return gopd + '' === "foo" && gpo;
}

try {
  if (testCode()) {
    console.log("annexb.es2017.Proxy.__lookupSetter__.js: OK");
  } else {
    console.log("annexb.es2017.Proxy.__lookupSetter__.js: FAIL");
  }
} catch (e) {
  console.log("annexb.es2017.Proxy.__lookupSetter__.js: FAIL: " + e);
}