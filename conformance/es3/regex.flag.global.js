// ES3: 15.5.4.10 String.prototype.match (regexp)
// Global flag behavior
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var r1 = "aaa".match(/a/);
if (r1 != null && r1[0] == "a" && r1.length == 1) {
  ok++;
} else {
  console.log("es3/regex.flag.global.js: non-global match failed");
}

var r2 = "aaa".match(/a/g);
if (r2 != null && r2.length == 3 && r2[0] == "a" && r2[1] == "a" && r2[2] == "a") {
  ok++;
} else {
  console.log("es3/regex.flag.global.js: global match failed");
}

var r3 = "aba".match(/a/g);
if (r3 != null && r3.length == 2 && r3[0] == "a" && r3[1] == "a") {
  ok++;
} else {
  console.log("es3/regex.flag.global.js: multiple matches failed");
}

if (ok == 3) {
  console.log("es3/regex.flag.global.js: OK");
} else {
  console.log("es3/regex.flag.global.js: failed");
}
