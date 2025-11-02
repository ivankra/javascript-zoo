// ES3: 15.10.2.6 Assertion
// Assertion :: $
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (/abc$/.test("abc")) {
  ok++;
} else {
  console.log("es3.regex.end.js: $ at end failed");
}

if (!/abc$/.test("abcx")) {
  ok++;
} else {
  console.log("es3.regex.end.js: $ not at end failed");
}

if (ok == 2) {
  console.log("es3.regex.end.js: OK");
} else {
  console.log("es3.regex.end.js: FAIL");
}
