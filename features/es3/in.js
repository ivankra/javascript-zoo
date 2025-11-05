// ES3: 11.8.7 The in operator
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var obj = new Object();
obj.foo = 1;
if ("foo" in obj) {
  ok++;
} else {
  console.log("es3/in.js: property in object failed");
}

if (!("bar" in obj)) {
  ok++;
} else {
  console.log("es3/in.js: missing property in object failed");
}

var arr = new Array();
arr[0] = 1;
arr[5] = 2;
if (0 in arr) {
  ok++;
} else {
  console.log("es3/in.js: numeric property in array failed");
}

if (5 in arr) {
  ok++;
} else {
  console.log("es3/in.js: sparse array index failed");
}

if (!(3 in arr)) {
  ok++;
} else {
  console.log("es3/in.js: missing array index failed");
}

if ("length" in arr) {
  ok++;
} else {
  console.log("es3/in.js: length in array failed");
}

if (ok == 6) {
  console.log("es3/in.js: OK");
} else {
  console.log("es3/in.js: failed");
}
