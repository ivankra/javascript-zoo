// ES1: 9.2 ToBoolean
//
// ES1: 12.5 The IF statement
// Calls ToBoolean on the conditional expression
//
// ES1: 11.4.9 Logical NOT operator ( ! )
// Calls ToBoolean on and negates
//
// ES1: 15.6.1.1 Boolean(value)
// Calls ToBoolean(value) and returns the primitive boolean value.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var x = true;
if (x) {
  ok++;
} else {
  console.log("es1/conversions.ToBoolean.js: true failed");
}

x = false;
if (!x) {
  ok++;
} else {
  console.log("es1/conversions.ToBoolean.js: false failed");
}

x = Boolean(true);
if (x) {
  ok++;
} else {
  console.log("es1/conversions.ToBoolean.js: Boolean(true) failed");
}

x = Boolean(false);
if (!x) {
  ok++;
} else {
  console.log("es1/conversions.ToBoolean.js: Boolean(false) failed");
}

var x = new Boolean(true);
if (x) {
  ok++;
} else {
  console.log("es1/conversions.ToBoolean.js:new Boolean(true) failed");
}

// ToBoolean for any Object is true, even for Boolean object wrapping false:
// Boolean(new Boolean(false)) == true
var x = new Boolean(false);  // return an object
if (x) {
  ok++;
} else {
  console.log("es1/conversions.ToBoolean.js: new Boolean(false) failed - expected it to be truthy");
}

var x = 0;
if (!x) {
  ok++;
} else {
  console.log("es1/conversions.ToBoolean.js: 0 failed");
}

var x = 1;
if (x) {
  ok++;
} else {
  console.log("es1/conversions.ToBoolean.js: 1 failed");
}

var x = 0 / 0;
if (!x) {
  ok++;
} else {
  console.log("es1/conversions.ToBoolean.js: NaN failed");
}

var x = "";
if (!x) {
  ok++;
} else {
  console.log("es1/conversions.ToBoolean.js: '' failed");
}

var x = "x";
if (x) {
  ok++;
} else {
  console.log("es1/conversions.ToBoolean.js: 'x' failed");
}

var x = new Object();
if (x) {
  ok++;
} else {
  console.log("es1/conversions.ToBoolean.js: new Object() failed");
}

if (ok == 12) {
  console.log("es1/conversions.ToBoolean.js: OK");
} else {
  console.log("es1/conversions.ToBoolean.js: failed");
}
