// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-string.prototype.anchor
// compat-table: ES6 > annex b > String.prototype HTML methods (tiny) > quotes in arguments are escaped
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var i, names = ["anchor", "fontcolor", "fontsize", "link"];
  for (i = 0; i < names.length; i++) {
    if (""[names[i]]('"') !== ""[names[i]]('&' + 'quot;')) {
      return false;
    }
  }
  return true;
}

try {
  if (testCode()) {
    console.log("annexb.es6.String.prototype.html.quotes-escaped.js: OK");
  } else {
    console.log("annexb.es6.String.prototype.html.quotes-escaped.js: FAIL");
  }
} catch (e) {
  console.log("annexb.es6.String.prototype.html.quotes-escaped.js: FAIL: " + e);
}