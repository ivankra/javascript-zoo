// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-template-literals
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
// compat-table: ES6 > syntax > template literals (large) > tagged template literals
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var called = false;
  function fn(parts, a, b) {
    called = true;
    return parts instanceof Array &&
      parts[0]     === "foo"      &&
      parts[1]     === "bar\n"    &&
      parts.raw[0] === "foo"      &&
      parts.raw[1] === "bar\\n"   &&
      a === 123                   &&
      b === 456;
  }
  return fn `foo${123}bar\n${456}` && called;
}

try {
  if (testCode()) {
    console.log("es6.template.tagged.js: OK");
  } else {
    console.log("es6.template.tagged.js: FAIL");
  }
} catch (e) {
  console.log("es6.template.tagged.js: FAIL: " + e);
}