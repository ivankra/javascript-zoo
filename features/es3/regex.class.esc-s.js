// ES3: 15.10.2.12 CharacterClassEscape
// CharacterClassEscape :: s
// CharacterClassEscape :: S
// ES3: 15.10.2.19 ClassEscape
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (/\s/.test(" ")) {
  ok++;
} else {
  console.log("es3/regex.class.esc-s.js: \\s failed");
}

if (/\s+/.test("  \t")) {
  ok++;
} else {
  console.log("es3/regex.class.esc-s.js: \\s+ failed");
}

if (/\S/.test("a")) {
  ok++;
} else {
  console.log("es3/regex.class.esc-s.js: \\S failed");
}

if (/[\s]/.test(" ")) {
  ok++;
} else {
  console.log("es3/regex.class.esc-s.js: \\s in bracket failed");
}

if (/[a-z\s]/.test(" ")) {
  ok++;
} else {
  console.log("es3/regex.class.esc-s.js: range with \\s failed");
}

if (/[\S]/.test("a")) {
  ok++;
} else {
  console.log("es3/regex.class.esc-s.js: \\S in bracket failed");
}

if (ok == 6) {
  console.log("es3/regex.class.esc-s.js: OK");
} else {
  console.log("es3/regex.class.esc-s.js: failed");
}
