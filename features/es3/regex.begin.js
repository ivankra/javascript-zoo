// ES3: 15.10.2.6 Assertion
// Assertion :: ^
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (/^abc/.test("abc")) {
  ok++;
} else {
  console.log("es3/regex.begin.js: ^ at start failed");
}

if (!/^abc/.test("xabc")) {
  ok++;
} else {
  console.log("es3/regex.begin.js: ^ not at start failed");
}

if (ok == 2) {
  console.log("es3/regex.begin.js: OK");
} else {
  console.log("es3/regex.begin.js: failed");
}
