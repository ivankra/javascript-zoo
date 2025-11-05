// ES1: 11.8 Relational operators
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var i = 100;
var j = 200;
var k = 100;

if (i < j) {
  ok++;
} else {
  console.log("es1/relational.js: 100 < 200 failed");
}

if (j > i) {
  ok++;
} else {
  console.log("es1/relational.js: 200 > 100 failed");
}

if (i <= k) {
  ok++;
} else {
  console.log("es1/relational.js: 100 <= 100 failed");
}

if (i <= j) {
  ok++;
} else {
  console.log("es1/relational.js: 100 <= 200 failed");
}

if (k >= i) {
  ok++;
} else {
  console.log("es1/relational.js: 100 >= 100 failed");
}

if (j >= i) {
  ok++;
} else {
  console.log("es1/relational.js: 200 >= 100 failed");
}

var s = "abc";
var t = "def";
var u = "abc";

if (s < t) {
  ok++;
} else {
  console.log("es1/relational.js: 'abc' < 'def' failed");
}

if (t > s) {
  ok++;
} else {
  console.log("es1/relational.js: 'def' > 'abc' failed");
}

if (s <= u) {
  ok++;
} else {
  console.log("es1/relational.js: 'abc' <= 'abc' failed");
}

if (s <= t) {
  ok++;
} else {
  console.log("es1/relational.js: 'abc' <= 'def' failed");
}

if (u >= s) {
  ok++;
} else {
  console.log("es1/relational.js: 'abc' >= 'abc' failed");
}

if (t >= s) {
  ok++;
} else {
  console.log("es1/relational.js: 'def' >= 'abc' failed");
}

if (ok == 12) {
  console.log("es1/relational.js: OK");
} else {
  console.log("es1/relational.js: failed");
}
