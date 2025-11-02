// ES3: 15.10.2.13 CharacterClass
// CharacterClass :: [ ClassRanges ]
// CharacterClass :: [ ^ ClassRanges ]
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var r1 = /[abc]/.exec("xbz");
if (r1[0] == "b") {
  ok++;
} else {
  console.log("es3.regex.bracket.js: character class failed");
}

var r2 = /[^abc]/.exec("abx");
if (r2[0] == "x") {
  ok++;
} else {
  console.log("es3.regex.bracket.js: negated class failed");
}

var r3 = /[a-z]/.exec("m");
if (r3[0] == "m") {
  ok++;
} else {
  console.log("es3.regex.bracket.js: range failed");
}

var r4 = /[a-z]+/.exec("hello");
if (r4[0] == "hello") {
  ok++;
} else {
  console.log("es3.regex.bracket.js: range multiple failed");
}

if (ok == 4) {
  console.log("es3.regex.bracket.js: OK");
} else {
  console.log("es3.regex.bracket.js: FAIL");
}
