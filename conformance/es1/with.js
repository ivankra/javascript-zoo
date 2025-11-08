// ES1: 12.10 The with statement
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var obj = new Object();
obj.a = 10;
obj.b = 20;

var a = 1;
var b = 2;

with (obj) {
  if (a == 10) {
    ok++;
  } else {
    console.log("es1/with.js: property lookup failed");
  }

  if (b == 20) {
    ok++;
  } else {
    console.log("es1/with.js: second property lookup failed");
  }
}

if (a == 1 && b == 2) {
  ok++;
} else {
  console.log("es1/with.js: outer scope corrupted");
}

var obj2 = new Object();
obj2.x = 5;

with (obj2) {
  x = x + 3;
  b++;
}

if (obj2.x == 8 && b == 3) {
  ok++;
} else {
  console.log("es1/with.js: assignment failed");
}

if (ok == 4) {
  console.log("es1/with.js: OK");
} else {
  console.log("es1/with.js: failed");
}
