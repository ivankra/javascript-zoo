// ES1: 15.5 String Objects
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

// ES1: 15.5.1 The String Constructor Called as a Function
// ES1: 15.5.1.1 String(value)
var s1 = String(123);
if (s1 == "123" && typeof s1 == "string") {
  ok++;
} else {
  console.log("es1/String.js: 15.5.1.1 String(value) failed");
}

// ES1: 15.5.1.2 String()
var s2 = String();
if (s2 == "" && typeof s2 == "string") {
  ok++;
} else {
  console.log("es1/String.js: 15.5.1.2 String() failed");
}

// ES1: 15.5.2 The String Constructor
// ES1: 15.5.2.1 new String(value)
var s3 = new String("test");
if (typeof s3 == "object") {
  ok++;
} else {
  console.log("es1/String.js: 15.5.2.1 new String(value) failed");
}

// ES1: 15.5.2.2 new String()
var s4 = new String();
if (typeof s4 == "object") {
  ok++;
} else {
  console.log("es1/String.js: 15.5.2.2 new String() failed");
}

// ES1: 15.5.3 Properties of the String Constructor
// ES1: 15.5.3.1 String.prototype
if (typeof String.prototype == "object") {
  ok++;
} else {
  console.log("es1/String.js: 15.5.3.1 String.prototype failed");
}

if (ok == 5) {
  console.log("es1/String.js: OK");
} else {
  console.log("es1/String.js: failed");
}
