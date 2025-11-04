// ES6: https://tc39.github.io/ecma262/#sec-object.values
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
// compat-table: ES2016+ > 2017 features > Object static methods (medium) > Object.values
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var obj = Object.create({ a: "qux", d: "qux" });
  obj.a = "foo";
  obj.b = "bar";
  obj.c = "baz";
  var v = Object.values(obj);
  return Array.isArray(v) && String(v) === "foo,bar,baz";
}

try {
  if (testCode()) {
    console.log("es2017.Object.values.js: OK");
  } else {
    console.log("es2017.Object.values.js: FAIL");
  }
} catch (e) {
  console.log("es2017.Object.values.js: FAIL: " + e);
}