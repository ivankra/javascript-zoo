// ES3: 15.10.2.6 Assertion
// Assertion :: ^ (multiline mode)
// Assertion :: $ (multiline mode)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var r1 = /^b/m.exec("a\nb");
if (r1 != null && r1[0] == "b") {
  ok++;
} else {
  console.log("es3/regex.flag.multiline.js: ^ after LF failed");
}

var r2 = /^b/.exec("a\nb");
if (r2 == null) {
  ok++;
} else {
  console.log("es3/regex.flag.multiline.js: ^ without multiline failed");
}

var r3 = /a$/m.exec("a\nb");
if (r3 != null && r3[0] == "a") {
  ok++;
} else {
  console.log("es3/regex.flag.multiline.js: $ before LF failed");
}

var r4 = /a$/.exec("a\nb");
if (r4 == null) {
  ok++;
} else {
  console.log("es3/regex.flag.multiline.js: $ without multiline failed");
}

if (ok == 4) {
  console.log("es3/regex.flag.multiline.js: OK");
} else {
  console.log("es3/regex.flag.multiline.js: failed");
}
