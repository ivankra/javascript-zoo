// Standard: ES1 11.9 Equality operators
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var i = 100 + 23;
var j = 123;
var k = j + 1;

if (i == j) {
  ok += 1;
} else {
  console.log("es1.equals.js: 100 + 23 != 123");
}

if (i == i) {
  ok += 1;
} else {
  console.log("es1.equals.js: 123 != 123");
}

if (i != k) {
  ok += 1;
} else {
  console.log("es1.equals.js: 123 == 124");
}

var s = "123";
var t = "0123";

if (s == s) {
  ok += 1;
} else {
  console.log("es1.equals.js: '123' != '123'");
}

if (s != t) {
  ok += 1;
} else {
  console.log("es1.equals.js: '123' == '0123'");
}

var f = 123.0;
var g = 123.5;

if (f == f) {
  ok += 1;
} else {
  console.log("es1.equals.js: 123.0 != 123.0");
}

if (f != g) {
  ok += 1;
} else {
  console.log("es1.equals.js: 123.0 == 123.5");
}

var n = null;
var u;

if (n == n) {
  ok += 1;
} else {
  console.log("es1.equals.js: null != null");
}

if (n != n) {
  console.log("es1.equals.js: null != null");
} else {
  ok += 1;
}

if (u == u) {
  ok += 1;
} else {
  console.log("es1.equals.js: undefined != undefined");
}

if (u != u) {
  console.log("es1.equals.js: undefined != undefined");
} else {
  ok += 1;
}

var bf = false;
var bt = true;

if (bf == bf) {
  ok += 1;
} else {
  console.log("es1.equals.js: false != false");
}

if (bt != bt) {
  console.log("es1.equals.js: true != true");
} else {
  ok += 1;
}

if (bf != bt) {
  ok += 1;
} else {
  console.log("es1.equals.js: false == true");
}

if (ok == 14) {
  console.log("es1.equals.js: OK");
} else {
  console.log("es1.equals.js: FAIL");
  //console.log(ok);
}
