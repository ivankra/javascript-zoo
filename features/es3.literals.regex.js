// ES3: 7.8.5 Regular Expression Literals
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var r1 = /abc/;
var t1 = typeof r1;
if (t1 == "object" || t1 == "function") {
  ok++;
} else {
  console.log("es3.literals.regex.js: basic literal failed");
}

var r2 = /test/g;
var t2 = typeof r2;
if (t2 == "object" || t2 == "function") {
  ok++;
} else {
  console.log("es3.literals.regex.js: literal with flags failed");
}

if (ok == 2) {
  console.log("es3.literals.regex.js: OK");
} else {
  console.log("es3.literals.regex.js: FAIL");
}
