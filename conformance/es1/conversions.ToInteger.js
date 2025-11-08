// ES1: 9.4 ToInteger
//
// ES1: 15.5.4.4 String.prototype.charAt(pos)
// Calls ToInteger(pos) on the position argument
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s = "abcdef";

var x = s.charAt(2.9);
if (x == "c") {
  ok++;
} else {
  console.log("es1/conversions.ToInteger.js: 2.9 failed");
}

x = s.charAt(-0);
if (x == "a") {
  ok++;
} else {
  console.log("es1/conversions.ToInteger.js: -0 failed");
}

x = s.charAt(0 / 0);
if (x == "a") {
  ok++;
} else {
  console.log("es1/conversions.ToInteger.js: NaN failed");
}

x = s.charAt(1.1);
if (x == "b") {
  ok++;
} else {
  console.log("es1/conversions.ToInteger.js: 1.1 failed");
}

x = s.charAt(-1.9);
if (x == "") {
  ok++;
} else {
  console.log("es1/conversions.ToInteger.js: -1.9 failed");
}

x = s.charAt(5.7);
if (x == "f") {
  ok++;
} else {
  console.log("es1/conversions.ToInteger.js: 5.7 failed");
}

if (ok == 6) {
  console.log("es1/conversions.ToInteger.js: OK");
} else {
  console.log("es1/conversions.ToInteger.js: failed");
}
