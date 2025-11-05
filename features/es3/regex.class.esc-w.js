// ES3: 15.10.2.12 CharacterClassEscape
// CharacterClassEscape :: w
// CharacterClassEscape :: W
// ES3: 15.10.2.19 ClassEscape
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (/\w/.test("a")) {
  ok++;
} else {
  console.log("es3/regex.class.esc-w.js: \\w failed");
}

if (/\w+/.test("abc_123")) {
  ok++;
} else {
  console.log("es3/regex.class.esc-w.js: \\w+ failed");
}

if (/\W/.test("-")) {
  ok++;
} else {
  console.log("es3/regex.class.esc-w.js: \\W failed");
}

if (/[\w]/.test("a")) {
  ok++;
} else {
  console.log("es3/regex.class.esc-w.js: \\w in bracket failed");
}

if (/[0-9\w]/.test("a")) {
  ok++;
} else {
  console.log("es3/regex.class.esc-w.js: range with \\w failed");
}

if (/[\W]/.test("-")) {
  ok++;
} else {
  console.log("es3/regex.class.esc-w.js: \\W in bracket failed");
}

if (ok == 6) {
  console.log("es3/regex.class.esc-w.js: OK");
} else {
  console.log("es3/regex.class.esc-w.js: failed");
}
