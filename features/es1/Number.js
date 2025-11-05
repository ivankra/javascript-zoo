// ES1: 15.7 Number Objects
// ES1: 15.7.1 The Number Constructor Called as a Function
// ES1: 15.7.2 The Number Constructor
// ES1: 15.7.3 Properties of the Number Constructor
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

// ES1: 15.7.1.1 Number(value)
var n1 = Number("123");
if (n1 == 123 && typeof n1 == "number") {
  ok++;
} else {
  console.log("es1/Number.js: Number(value) failed");
}

// ES1: 15.7.1.2 Number()
var n2 = Number();
if (n2 == 0) {
  ok++;
} else {
  console.log("es1/Number.js: Number() failed");
}

// ES1: 15.7.2.1 new Number(value)
var n3 = new Number(456);
if (typeof n3 == "object") {
  ok++;
} else {
  console.log("es1/Number.js: new Number(value) failed");
}

// ES1: 15.7.2.2 new Number()
var n4 = new Number();
if (typeof n4 == "object") {
  ok++;
} else {
  console.log("es1/Number.js: new Number() failed");
}

// ES1: 15.7.3.1 Number.prototype
if (typeof Number.prototype == "object") {
  ok++;
} else {
  console.log("es1/Number.js: Number.prototype failed");
}

if (ok == 5) {
  console.log("es1/Number.js: OK");
} else {
  console.log("es1/Number.js: failed");
}
