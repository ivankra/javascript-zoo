// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-string.prototype.anchor
// compat-table: ES6 > annex b > String.prototype HTML methods (tiny) > tags' names are lowercase
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var i, names = ["anchor", "big", "bold", "fixed", "fontcolor", "fontsize",
    "italics", "link", "small", "strike", "sub", "sup"];
  for (i = 0; i < names.length; i++) {
    if (""[names[i]]().toLowerCase() !== ""[names[i]]()) {
      return false;
    }
  }
  return true;
}

try {
  if (testCode()) {
    console.log("annexb.es6.String.prototype.html.lowercase.js: OK");
  } else {
    console.log("annexb.es6.String.prototype.html.lowercase.js: FAIL");
  }
} catch (e) {
  console.log("annexb.es6.String.prototype.html.lowercase.js: FAIL: " + e);
}