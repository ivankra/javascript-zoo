// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-template-literals
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
// compat-table: ES6 > syntax > template literals (large) > arbitrary escape sequences in tagged template literals
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  function strings(array) {
    return array;
  }
  var str = strings`\1\xz\uz\u{110000}\u{z}`;
  return str.length === 1 && str[0] === undefined && str.raw.length === 1 && str.raw[0]==="\\1\\xz\\uz\\u{110000}\\u{z}"
}

try {
  if (testCode()) {
    console.log("es6.template.escape-sequences.js: OK");
  } else {
    console.log("es6.template.escape-sequences.js: FAIL");
  }
} catch (e) {
  console.log("es6.template.escape-sequences.js: FAIL: " + e);
}