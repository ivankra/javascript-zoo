// compat-table: ES2016+ > 2017 features > Object static methods (medium) > Object.entries
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
// spec: https://tc39.github.io/ecma262/#sec-object.entries
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var obj = Object.create({ a: "qux", d: "qux" });
  obj.a = "foo";
  obj.b = "bar";
  obj.c = "baz";
  var e = Object.entries(obj);
  return Array.isArray(e)
    && e.length === 3
    && String(e[0]) === "a,foo"
    && String(e[1]) === "b,bar"
    && String(e[2]) === "c,baz";
}

try {
  if (testCode()) {
    console.log("kangax-es2017/Object.entries.js: OK");
  } else {
    console.log("kangax-es2017/Object.entries.js: failed");
  }
} catch (e) {
  console.log("kangax-es2017/Object.entries.js: exception: " + e);
}
