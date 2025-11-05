// compat-table: ES6 > annex b > HTML-style comments (tiny)
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-html-like-comments
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
    console.log("kangax-es6/annex-b.html-comments.js: OK");
  } else {
    console.log("kangax-es6/annex-b.html-comments.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/annex-b.html-comments.js: exception: " + e);
}
