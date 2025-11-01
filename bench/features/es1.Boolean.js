// ES1: 15.6 Boolean Objects
// ES1: 15.6.1 The Boolean Constructor Called as a Function
// ES1: 15.6.2 The Boolean Constructor
// ES1: 15.6.3 Properties of the Boolean Constructor
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

// ES1: 15.6.1.1 Boolean(value)
var b1 = Boolean(true);
if (b1 == true && typeof b1 == "boolean") {
  ok++;
} else {
  console.log("es1.Boolean.js: Boolean(true) failed");
}

var b2 = Boolean(false);
if (b2 == false && typeof b2 == "boolean") {
  ok++;
} else {
  console.log("es1.Boolean.js: Boolean(false) failed");
}

// ES1: 15.6.1.2 Boolean()
var b3 = Boolean();
if (b3 == false) {
  ok++;
} else {
  console.log("es1.Boolean.js: Boolean() failed");
}

// ES1: 15.6.2.1 new Boolean(value)
var b4 = new Boolean(true);
if (typeof b4 == "object") {
  ok++;
} else {
  console.log("es1.Boolean.js: new Boolean(true) failed");
}

// ES1: 15.6.2.2 new Boolean()
var b5 = new Boolean();
if (typeof b5 == "object") {
  ok++;
} else {
  console.log("es1.Boolean.js: new Boolean() failed");
}

// ES1: 15.6.3.1 Boolean.prototype
if (typeof Boolean.prototype == "object") {
  ok++;
} else {
  console.log("es1.Boolean.js: Boolean.prototype failed");
}

if (ok == 6) {
  console.log("es1.Boolean.js: OK");
} else {
  console.log("es1.Boolean.js: FAIL");
}
