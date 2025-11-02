// ES1: 9.9 ToObject
//
// ES1: 15.2.1.1 Object(value)
// Calls ToObject(value) when value is not null or undefined.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var x = Object(true);
if (typeof x == "object") {
  ok++;
} else {
  console.log("es1.conversions.ToObject.js: true failed");
}

x = Object(false);
if (typeof x == "object") {
  ok++;
} else {
  console.log("es1.conversions.ToObject.js: false failed");
}

x = Object(123);
if (typeof x == "object") {
  ok++;
} else {
  console.log("es1.conversions.ToObject.js: 123 failed");
}

x = Object("hello");
if (typeof x == "object") {
  ok++;
} else {
  console.log("es1.conversions.ToObject.js: 'hello' failed");
}

var obj = new Object();
x = Object(obj);
if (x == obj) {
  ok++;
} else {
  console.log("es1.conversions.ToObject.js: Object passthrough failed");
}

x = Object(null);
if (typeof x == "object") {
  ok++;
} else {
  console.log("es1.conversions.ToObject.js: null failed");
}

if (ok == 6) {
  console.log("es1.conversions.ToObject.js: OK");
} else {
  console.log("es1.conversions.ToObject.js: FAIL");
}
