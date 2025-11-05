// ES3: 12.11 The switch Statement
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var x = 2;
var result1 = 0;
switch (x) {
  case 1:
    result1 = 10;
    break;
  case 2:
    result1 = 20;
    break;
  case 3:
    result1 = 30;
    break;
}
if (result1 == 20) {
  ok++;
} else {
  console.log("es3/switch.js: basic switch failed");
}

var y = 5;
var result2 = 0;
switch (y) {
  case 1:
    result2 = 10;
    break;
  case 2:
    result2 = 20;
    break;
  default:
    result2 = 99;
    break;
}
if (result2 == 99) {
  ok++;
} else {
  console.log("es3/switch.js: switch default failed");
}

var z = 1;
var result3 = 0;
switch (z) {
  case 1:
    result3 = result3 + 1;
  case 2:
    result3 = result3 + 2;
  case 3:
    result3 = result3 + 3;
    break;
}
if (result3 == 6) {
  ok++;
} else {
  console.log("es3/switch.js: switch fall-through failed");
}

var w = "test";
var result4 = 0;
switch (w) {
  case "foo":
    result4 = 1;
    break;
  case "test":
    result4 = 2;
    break;
  case "bar":
    result4 = 3;
    break;
}
if (result4 == 2) {
  ok++;
} else {
  console.log("es3/switch.js: switch with strings failed");
}

if (ok == 4) {
  console.log("es3/switch.js: OK");
} else {
  console.log("es3/switch.js: failed");
}
