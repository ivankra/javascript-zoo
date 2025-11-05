// compat-table: ES2016+ > 2017 annex b > Proxy internal calls, getter/setter methods (tiny) > __lookupGetter__
// spec: https://tc39.github.io/ecma262/#sec-object.prototype.__defineGetter__
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Object.prototype.__lookupGetter__ -> [[GetOwnProperty]]
  // Object.prototype.__lookupGetter__ -> [[GetPrototypeOf]]
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
  Object.prototype.__lookupGetter__.call(p, "foo");
  return gopd + '' === "foo" && gpo;
}

try {
  if (testCode()) {
    console.log("kangax-es2017/annex-b.Proxy.__lookupGetter__.js: OK");
  } else {
    console.log("kangax-es2017/annex-b.Proxy.__lookupGetter__.js: failed");
  }
} catch (e) {
  console.log("kangax-es2017/annex-b.Proxy.__lookupGetter__.js: exception: " + e);
}
