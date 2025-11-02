// ES1: 15.9 Date Objects
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

// ES1: 15.9.2 The Date Constructor Called as a Function
var s = Date();
if (typeof s == "string") {
  ok++;
} else {
  console.log("es1.Date.js: 15.9.2 Date() not a string");
}

// ES1: 15.9.3 The Date Constructor
var d = new Date();
if (typeof d == "object") {
  ok++;
} else {
  console.log("es1.Date.js: 15.9.3 new Date() not an object");
}

// ES1: 15.9.3.1 new Date(year, month [, date [, hours [, minutes [, seconds [, ms ] ] ] ] ] )
var d1 = new Date(2000, 0, 1);
if (d1.getFullYear() == 2000 && d1.getMonth() == 0 && d1.getDate() == 1) {
  ok++;
} else {
  console.log("es1.Date.js: 15.9.3.1 new Date(year, month, date) failed");
}

// ES1: 15.9.3.2 new Date(value)
var d2 = new Date(0);
if (d2.getTime() == 0) {
  ok++;
} else {
  console.log("es1.Date.js: 15.9.3.2 new Date(0) failed");
}

if (ok == 4) {
  console.log("es1.Date.js: OK");
} else {
  console.log("es1.Date.js: FAIL");
}
