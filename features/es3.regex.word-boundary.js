// ES3: 15.10.2.6 Assertion
// Assertion :: \ b
// Assertion :: \ B
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (/\bword\b/.test("a word b")) {
  ok++;
} else {
  console.log("es3.regex.word-boundary.js: \\b word boundary failed");
}

if (!/\bword\b/.test("sword")) {
  ok++;
} else {
  console.log("es3.regex.word-boundary.js: \\b no boundary failed");
}

if (/\Bor/.test("word")) {
  ok++;
} else {
  console.log("es3.regex.word-boundary.js: \\B non-boundary failed");
}

if (!/\Bor/.test("or")) {
  ok++;
} else {
  console.log("es3.regex.word-boundary.js: \\B at boundary failed");
}

if (ok == 4) {
  console.log("es3.regex.word-boundary.js: OK");
} else {
  console.log("es3.regex.word-boundary.js: FAIL");
}
