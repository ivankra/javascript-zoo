// ES1: 15.9 Date Objects
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

// 15.9.2 The Date Constructor Called as a Function
var s = Date();
if (typeof s == "string") {
  ok++;
} else {
  console.log("es1/Date.js: typeof Date() != 'string'");
}

// 15.9.3 The Date Constructor
var d1 = new Date();
if (typeof d1 == "object") {
  ok++;
} else {
  console.log("es1/Date.js: typeof new Date() != 'object'");
}

// 15.9.3.1 new Date(year, month [, date [, hours [, minutes [, seconds [, ms ] ] ] ] ] )
var d2 = new Date(2000, 0, 1);
if (d2.getFullYear() != 2000) {
  console.log("es1/Date.js: new Date(2000, 0, 1).getFullYear() != 2000");
} else {
  ok++;
}
if (d2.getMonth() != 0) {
  console.log("es1/Date.js: new Date(2000, 0, 1).getMonth() != 0");
} else {
  ok++;
}
if (d2.getDate() != 1) {
  console.log("es1/Date.js: new Date(2000, 0, 1).getDate() != 1");
} else {
  ok++;
}

// 15.9.3.2 new Date(value)
var d3 = new Date(0);
if (d3.getTime() == 0) {
  ok++;
} else {
  console.log("es1/Date.js: new Date(0).getTime() != 0");
}

if (ok == 6) {
  console.log("es1/Date.js: OK");
} else {
  console.log("es1/Date.js: failed");
}
