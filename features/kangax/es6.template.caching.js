// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-template-literals
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
// compat-table: ES6 > syntax > template literals (large) > TemplateStrings call site caching
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // TemplateStrings caching was changed from per-contents to
  // per-call-site.
  // https://github.com/tc39/ecma262/pull/890
  function strings(array) {
    return array;
  }
  function getStrings() {
    return strings`foo`;
  }
  var original = getStrings();
  var other = strings`foo`;
  return original === getStrings() && original !== other;
}

try {
  if (testCode()) {
    console.log("es6.template.caching.js: OK");
  } else {
    console.log("es6.template.caching.js: FAIL");
  }
} catch (e) {
  console.log("es6.template.caching.js: FAIL: " + e);
}