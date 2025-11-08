// ES3: 15.10.2.8 Atom
// Atom :: ( Disjunction )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var r1 = /(abc)/.exec("abc");
if (r1[0] == "abc" && r1[1] == "abc") {
  ok++;
} else {
  console.log("es3/regex.group.js: capture failed");
}

var r2 = /a(b)c/.exec("abc");
if (r2[1] == "b") {
  ok++;
} else {
  console.log("es3/regex.group.js: middle capture failed");
}

var r3 = /(a)(b)(c)/.exec("abc");
if (r3[1] == "a" && r3[2] == "b" && r3[3] == "c") {
  ok++;
} else {
  console.log("es3/regex.group.js: multiple captures failed");
}

if (ok == 3) {
  console.log("es3/regex.group.js: OK");
} else {
  console.log("es3/regex.group.js: failed");
}
