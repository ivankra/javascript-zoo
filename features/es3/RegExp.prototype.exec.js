// ES3: 15.10.6.2 RegExp.prototype.exec(string)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var re = new RegExp("b(c)d");
var result = re.exec("abcde");

if (result != null) {
  ok++;
} else {
  console.log("es3/RegExp.prototype.exec.js: match failed");
}

if (result[0] == "bcd") {
  ok++;
} else {
  console.log("es3/RegExp.prototype.exec.js: full match failed");
}

if (result[1] == "c") {
  ok++;
} else {
  console.log("es3/RegExp.prototype.exec.js: capture failed");
}

if (result.index == 1) {
  ok++;
} else {
  console.log("es3/RegExp.prototype.exec.js: index failed");
}

if (result.input == "abcde") {
  ok++;
} else {
  console.log("es3/RegExp.prototype.exec.js: input failed");
}

var nomatch = re.exec("xyz");
if (nomatch == null) {
  ok++;
} else {
  console.log("es3/RegExp.prototype.exec.js: no match failed");
}

if (ok == 6) {
  console.log("es3/RegExp.prototype.exec.js: OK");
} else {
  console.log("es3/RegExp.prototype.exec.js: failed");
}
