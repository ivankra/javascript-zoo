// ES3: 15.10.6.4 RegExp.prototype.toString()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var re = new RegExp("abc", "g");
var s = re.toString();

if (typeof s == "string") {
  ok++;
} else {
  console.log("es3/RegExp.prototype.toString.js: type failed");
}

if (s == "/abc/g") {
  ok++;
} else {
  console.log("es3/RegExp.prototype.toString.js: format failed");
}

if (ok == 2) {
  console.log("es3/RegExp.prototype.toString.js: OK");
} else {
  console.log("es3/RegExp.prototype.toString.js: failed");
}
