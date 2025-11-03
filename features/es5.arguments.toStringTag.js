// ES5: 10.6 Arguments Object
// compat-table: ES5 > Miscellaneous (medium) > Arguments toStringTag is "Arguments"
//
// Arguments object [[Class]] was not specified in ES3.
// Arguments object [[Class]] is "Arguments" in ES5.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var result = (function() {
  return Object.prototype.toString.call(arguments) === '[object Arguments]';
}());

if (result) {
  console.log("es5.arguments.toStringTag.js: OK");
} else {
  console.log("es5.arguments.toStringTag.js: FAIL");
}
