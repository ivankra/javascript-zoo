// compat-table: ES2016+ > 2018 features > s (dotAll) flag for regular expressions (small)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/dotAll
// spec: https://tc39.github.io/ecma262/#sec-get-regexp.prototype.dotAll
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  const regex = /foo.bar/s;
  return regex.test('foo\nbar');
}

try {
  if (testCode()) {
    console.log("kangax-es2018/regex.flags.s.js: OK");
  } else {
    console.log("kangax-es2018/regex.flags.s.js: failed");
  }
} catch (e) {
  console.log("kangax-es2018/regex.flags.s.js: exception: " + e);
}
