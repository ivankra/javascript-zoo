// ES3: B.2.3 String.prototype.substr (start, length)
// ES5: B.2.3 String.prototype.substr (start, length)
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr
// compat-table: ES5 > String properties and methods (small) > String.prototype.substr
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s = "abcdefgh";
var x = s.substr(2, 3);
if (x == "cde") {
  ok++;
} else {
  console.log("es3/annex-b.String.prototype.substr.js: positive start failed");
}

var s2 = "0b";
if (s2.substr(-1) === "b") {
  ok++;
} else {
  console.log("es3/annex-b.String.prototype.substr.js: negative start failed");
}

var s3 = "hello";
if (s3.substr(-3, 2) === "ll") {
  ok++;
} else {
  console.log("es3/annex-b.String.prototype.substr.js: negative start with length failed");
}

if (ok === 3) {
  console.log("es3/annex-b.String.prototype.substr.js: OK");
} else {
  console.log("es3/annex-b.String.prototype.substr.js: failed");
}
