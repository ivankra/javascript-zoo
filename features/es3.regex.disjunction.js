// ES3: 15.10.2.3 Disjunction
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var r1 = /a|ab/.exec("abc");
if (r1[0] == "a") {
  ok++;
} else {
  console.log("es3.regex.disjunction.js: a|ab failed");
}

var r2 = /((a)|(ab))((c)|(bc))/.exec("abc");
if (r2[0] == "abc" && r2[1] == "a" && r2[2] == "a" && typeof r2[3] == "undefined" && r2[4] == "bc" && typeof r2[5] == "undefined" && r2[6] == "bc") {
  ok++;
} else {
  console.log("es3.regex.disjunction.js: complex disjunction failed");
}

if (ok == 2) {
  console.log("es3.regex.disjunction.js: OK");
} else {
  console.log("es3.regex.disjunction.js: FAIL");
}
