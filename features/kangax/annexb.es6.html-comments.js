// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-html-like-comments
// compat-table: ES6 > annex b > HTML-style comments (tiny)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  --> A comment
  <!-- Another comment
  var a = 3; <!-- Another comment
  return a === 3;
}

try {
  if (testCode()) {
    console.log("annexb.es6.html-comments.js: OK");
  } else {
    console.log("annexb.es6.html-comments.js: FAIL");
  }
} catch (e) {
  console.log("annexb.es6.html-comments.js: FAIL: " + e);
}