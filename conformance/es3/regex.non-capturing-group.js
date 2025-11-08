// ES3: 15.10.2.8 Atom
// Atom :: (?: Disjunction )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var r1 = /(?:abc)/.exec("abc");
if (r1[0] == "abc" && r1.length == 1) {
  ok++;
} else {
  console.log("es3/regex.non-capturing-group.js: no capture failed");
}

var r2 = /a(?:b)c/.exec("abc");
if (r2[0] == "abc" && r2.length == 1) {
  ok++;
} else {
  console.log("es3/regex.non-capturing-group.js: middle group failed");
}

var r3 = /(a)(?:b)(c)/.exec("abc");
if (r3[1] == "a" && r3[2] == "c" && r3.length == 3) {
  ok++;
} else {
  console.log("es3/regex.non-capturing-group.js: mixed groups failed");
}

if (ok == 3) {
  console.log("es3/regex.non-capturing-group.js: OK");
} else {
  console.log("es3/regex.non-capturing-group.js: failed");
}
