// ES6: https://tc39.github.io/ecma262/#sec-object.prototype.__defineGetter__
// compat-table: ES2016+ > 2017 annex b > Object.prototype getter/setter methods (tiny) > __defineSetter__, ToObject(this)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var key = '__accessors_test__';
  __defineSetter__.call(1, key, function () {});
  try {
  __defineSetter__.call(null, key, function () {});
  } catch (e) {
  return true;
  }
}

try {
  if (testCode()) {
    console.log("annexb.es2017.Object.prototype.__defineSetter__.ToObject.js: OK");
  } else {
    console.log("annexb.es2017.Object.prototype.__defineSetter__.ToObject.js: FAIL");
  }
} catch (e) {
  console.log("annexb.es2017.Object.prototype.__defineSetter__.ToObject.js: FAIL: " + e);
}