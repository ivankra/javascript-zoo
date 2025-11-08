// compat-table: ES6 > annex b > String.prototype HTML methods (tiny) > existence
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/prototype#HTML_wrapper_methods
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-string.prototype.anchor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var i, names = ["anchor", "big", "bold", "fixed", "fontcolor", "fontsize",
    "italics", "link", "small", "strike", "sub", "sup"];
  for (i = 0; i < names.length; i++) {
    if (typeof String.prototype[names[i]] !== 'function') {
      return false;
    }
  }
  return true;
}

try {
  if (testCode()) {
    console.log("kangax-es6/annex-b.String.prototype.html.existence.js: OK");
  } else {
    console.log("kangax-es6/annex-b.String.prototype.html.existence.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/annex-b.String.prototype.html.existence.js: exception: " + e);
}
