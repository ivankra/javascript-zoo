// ES3: 11.1.5 Object Initialiser
// ES3: 7.8.3 Numeric Literals
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var o1 = {0xff: "value"};
if (o1[255] == "value") {
  ok++;
} else {
  console.log("es3.literals.object.hex.js: property name 0xff failed");
}

var o2 = {0x10: "sixteen"};
if (o2[16] == "sixteen") {
  ok++;
} else {
  console.log("es3.literals.object.hex.js: property name 0x10 failed");
}

var o3 = {0xABC: "test"};
if (o3[2748] == "test") {
  ok++;
} else {
  console.log("es3.literals.object.hex.js: property name 0xABC failed");
}

if (ok == 3) {
  console.log("es3.literals.object.hex.js: OK");
} else {
  console.log("es3.literals.object.hex.js: FAIL");
}
