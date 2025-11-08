// compat-table: ES6 > annex b > String.prototype HTML methods (tiny) > tags' names are lowercase
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-string.prototype.anchor
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
    console.log("kangax-es6/annex-b.String.prototype.html.lowercase.js: OK");
  } else {
    console.log("kangax-es6/annex-b.String.prototype.html.lowercase.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/annex-b.String.prototype.html.lowercase.js: exception: " + e);
}
