// compat-table: ES2016+ > 2017 annex b > Object.prototype getter/setter methods (tiny) > __lookupGetter__, ToObject(this)
// spec: https://tc39.github.io/ecma262/#sec-object.prototype.__defineGetter__
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  __lookupGetter__.call(1, 'key');
  try {
    __lookupGetter__.call(null, 'key');
  } catch (e) {
    return true;
  }
}

try {
  if (testCode()) {
    console.log("kangax-es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js: OK");
  } else {
    console.log("kangax-es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js: failed");
  }
} catch (e) {
  console.log("kangax-es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js: exception: " + e);
}
