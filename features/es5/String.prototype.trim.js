// ES5: 15.5.4.20 String.prototype.trim ( )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
// compat-table: ES5 > String properties and methods (small) > String.prototype.trim
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof String.prototype.trim === 'function') {
  ok++;
} else {
  console.log("es5/String.prototype.trim.js: String.prototype.trim not a function");
}

var s1 = "  hello  ";
if (s1.trim() === "hello") {
  ok++;
} else {
  console.log("es5/String.prototype.trim.js: '  hello '.trim() failed");
}

var s2 = "\t\ntest\r\n";
if (s2.trim() === "test") {
  ok++;
} else {
  console.log("es5/String.prototype.trim.js: failed to trim other whitespace characters");
}

var s3 = "no whitespace";
if (s3.trim() === "no whitespace") {
  ok++;
} else {
  console.log("es5/String.prototype.trim.js: 'no whitespace'.trim() failed");
}

var s4 = "   ";
if (s4.trim() === "") {
  ok++;
} else {
  console.log("es5/String.prototype.trim.js: '   '.trim() failed");
}

if (ok === 5) {
  console.log("es5/String.prototype.trim.js: OK");
} else {
  console.log("es5/String.prototype.trim.js: failed");
}
