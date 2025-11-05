// ES1: 9.8 ToString
//
// ES1: 15.5.1.1 String(value)
// Calls ToString(value) and returns a String value.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var x = String(true);
if (x == "true") {
  ok++;
} else {
  console.log("es1/conversions.ToString.js: true failed");
}

x = String(false);
if (x == "false") {
  ok++;
} else {
  console.log("es1/conversions.ToString.js: false failed");
}

x = String(null);
if (x == "null") {
  ok++;
} else {
  console.log("es1/conversions.ToString.js: null failed");
}

x = String(0 / 0);
if (x == "NaN") {
  ok++;
} else {
  console.log("es1/conversions.ToString.js: NaN failed");
}

x = String(0);
if (x == "0") {
  ok++;
} else {
  console.log("es1/conversions.ToString.js: 0 failed");
}

x = String(-0);
if (x == "0") {
  ok++;
} else {
  console.log("es1/conversions.ToString.js: -0 failed");
}

x = String(1 / 0);
if (x == "Infinity") {
  ok++;
} else {
  console.log("es1/conversions.ToString.js: Infinity failed");
}

x = String(-1 / 0);
if (x == "-Infinity") {
  ok++;
} else {
  console.log("es1/conversions.ToString.js: -Infinity failed");
}

x = String(123);
if (x == "123") {
  ok++;
} else {
  console.log("es1/conversions.ToString.js: 123 failed");
}

x = String(-456);
if (x == "-456") {
  ok++;
} else {
  console.log("es1/conversions.ToString.js: -456 failed");
}

x = String(3.14);
if (x == "3.14") {
  ok++;
} else {
  console.log("es1/conversions.ToString.js: 3.14 failed");
}

x = String(0.0001);
if (x == "0.0001") {
  ok++;
} else {
  console.log("es1/conversions.ToString.js: 0.0001 failed");
}

x = String(1e21);
if (x == "1e+21") {
  ok++;
} else {
  console.log("es1/conversions.ToString.js: 1e21 failed");
}

x = String(1e-7);
if (x == "1e-7") {
  ok++;
} else {
  console.log("es1/conversions.ToString.js: 1e-7 failed");
}

if (ok == 14) {
  console.log("es1/conversions.ToString.js: OK");
} else {
  console.log("es1/conversions.ToString.js: failed");
}
