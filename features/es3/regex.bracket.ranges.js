// ES3: 15.10.2.13 CharacterClass
// ES3: 15.10.2.14 ClassRanges
// ES3: 15.10.2.15 NonemptyClassRanges
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (/[abc]/.test("b")) {
  ok++;
} else {
  console.log("es3/regex.bracket.ranges.js: single chars failed");
}

if (/[a-z]/.test("m")) {
  ok++;
} else {
  console.log("es3/regex.bracket.ranges.js: range failed");
}

if (/[a-zA-Z]/.test("M")) {
  ok++;
} else {
  console.log("es3/regex.bracket.ranges.js: multiple ranges failed");
}

if (/[^abc]/.test("x")) {
  ok++;
} else {
  console.log("es3/regex.bracket.ranges.js: negated class failed");
}

if (/[-abc]/.test("-")) {
  ok++;
} else {
  console.log("es3/regex.bracket.ranges.js: literal dash at start failed");
}

if (/[abc-]/.test("-")) {
  ok++;
} else {
  console.log("es3/regex.bracket.ranges.js: literal dash at end failed");
}

if (/[a-c-x]/.test("-")) {
  ok++;
} else {
  console.log("es3/regex.bracket.ranges.js: dash after range failed");
}

if (/[E-F]/i.test("e")) {
  ok++;
} else {
  console.log("es3/regex.bracket.ranges.js: case insensitive range failed");
}

if (ok == 8) {
  console.log("es3/regex.bracket.ranges.js: OK");
} else {
  console.log("es3/regex.bracket.ranges.js: failed");
}
