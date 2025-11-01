// ES1: 15.2.1 The Object Constructor Called as a Function
// ES1: 15.2.2 The Object Constructor
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var o1 = Object();
o1.a = 1;
if (o1.a == 1) {
  ok++;
} else {
  console.log("es1.Object.js: Object() failed");
}

var o2 = Object(123);
if (typeof o2 == "object") {
  ok++;
} else {
  console.log("es1.Object.js: Object(number) failed");
}

var o3 = new Object();
o3.b = 2;
if (o3.b == 2) {
  ok++;
} else {
  console.log("es1.Object.js: new Object() failed");
}

var o4 = new Object("test");
if (typeof o4 == "object") {
  ok++;
} else {
  console.log("es1.Object.js: new Object(string) failed");
}

if (ok == 4) {
  console.log("es1.Object.js: OK");
} else {
  console.log("es1.Object.js: FAIL");
}
