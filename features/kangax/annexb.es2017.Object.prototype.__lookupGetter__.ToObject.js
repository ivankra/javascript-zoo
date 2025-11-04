// ES6: https://tc39.github.io/ecma262/#sec-object.prototype.__defineGetter__
// compat-table: ES2016+ > 2017 annex b > Object.prototype getter/setter methods (tiny) > __lookupGetter__, ToObject(this)
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
    console.log("annexb.es2017.Object.prototype.__lookupGetter__.ToObject.js: OK");
  } else {
    console.log("annexb.es2017.Object.prototype.__lookupGetter__.ToObject.js: FAIL");
  }
} catch (e) {
  console.log("annexb.es2017.Object.prototype.__lookupGetter__.ToObject.js: FAIL: " + e);
}