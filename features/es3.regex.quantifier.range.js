// ES3: 15.10.2.7 Quantifier
// QuantifierPrefix :: { DecimalDigits , DecimalDigits }
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var r1 = /a{2,4}/.exec("aaaaa");
if (r1[0] == "aaaa") {
  ok++;
} else {
  console.log("es3.regex.quantifier.range.js: max limit failed");
}

var r2 = /a{2,4}/.exec("a");
if (r2 == null) {
  ok++;
} else {
  console.log("es3.regex.quantifier.range.js: below min failed");
}

var r3 = /a{2,4}/.exec("aaa");
if (r3[0] == "aaa") {
  ok++;
} else {
  console.log("es3.regex.quantifier.range.js: in range failed");
}

if (ok == 3) {
  console.log("es3.regex.quantifier.range.js: OK");
} else {
  console.log("es3.regex.quantifier.range.js: FAIL");
}
