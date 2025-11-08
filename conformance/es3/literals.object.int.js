// ES3: 11.1.5 Object Initialiser
// ES3: 7.8.3 Numeric Literals
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var o1 = {0: "zero"};
if (o1[0] == "zero") {
  ok++;
} else {
  console.log("es3/literals.object.int.js: property name 0 failed");
}

var o2 = {123: "value"};
if (o2[123] == "value") {
  ok++;
} else {
  console.log("es3/literals.object.int.js: property name 123 failed");
}

var o3 = {1: "a", 2: "b", 3: "c"};
if (o3[1] == "a" && o3[2] == "b" && o3[3] == "c") {
  ok++;
} else {
  console.log("es3/literals.object.int.js: multiple numeric property names failed");
}

if (ok == 3) {
  console.log("es3/literals.object.int.js: OK");
} else {
  console.log("es3/literals.object.int.js: failed");
}
