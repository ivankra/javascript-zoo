// ES3: 11.1.5 Object Initialiser
// ES3: 7.8.3 Numeric Literals
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var o1 = {1.5: "value"};
if (o1[1.5] == "value") {
  ok++;
} else {
  console.log("es3.literals.object.decimal.js: property name 1.5 failed");
}

var o2 = {3.14: "pi"};
if (o2[3.14] == "pi") {
  ok++;
} else {
  console.log("es3.literals.object.decimal.js: property name 3.14 failed");
}

var o3 = {1e2: "hundred"};
if (o3[100] == "hundred") {
  ok++;
} else {
  console.log("es3.literals.object.decimal.js: property name 1e2 failed");
}

var o4 = {2.5e1: "twentyfive"};
if (o4[25] == "twentyfive") {
  ok++;
} else {
  console.log("es3.literals.object.decimal.js: property name 2.5e1 failed");
}

if (ok == 4) {
  console.log("es3.literals.object.decimal.js: OK");
} else {
  console.log("es3.literals.object.decimal.js: FAIL");
}
