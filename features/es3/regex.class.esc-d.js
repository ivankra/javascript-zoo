// ES3: 15.10.2.12 CharacterClassEscape
// CharacterClassEscape :: d
// CharacterClassEscape :: D
// ES3: 15.10.2.19 ClassEscape
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (/\d/.test("5")) {
  ok++;
} else {
  console.log("es3/regex.class.esc-d.js: \\d failed");
}

if (/\d+/.test("123")) {
  ok++;
} else {
  console.log("es3/regex.class.esc-d.js: \\d+ failed");
}

if (/\D/.test("a")) {
  ok++;
} else {
  console.log("es3/regex.class.esc-d.js: \\D failed");
}

if (/[\d]/.test("5")) {
  ok++;
} else {
  console.log("es3/regex.class.esc-d.js: \\d in bracket failed");
}

if (/[a-z\d]/.test("5")) {
  ok++;
} else {
  console.log("es3/regex.class.esc-d.js: range with \\d failed");
}

if (/[\D]/.test("a")) {
  ok++;
} else {
  console.log("es3/regex.class.esc-d.js: \\D in bracket failed");
}

if (ok == 6) {
  console.log("es3/regex.class.esc-d.js: OK");
} else {
  console.log("es3/regex.class.esc-d.js: failed");
}
