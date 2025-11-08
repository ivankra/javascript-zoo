// compat-table: ES6 > syntax > template literals (large) > TemplateStrings permanent caching
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-template-literals
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  function strings(array) {
    return array;
  }
  function getStrings() {
    return strings`foo`;
  }
  var original = getStrings();
  var newed = new getStrings();
  return original === getStrings() && original === newed;
}

try {
  if (testCode()) {
    console.log("kangax-es6/template.permanent-caching.js: OK");
  } else {
    console.log("kangax-es6/template.permanent-caching.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/template.permanent-caching.js: exception: " + e);
}
