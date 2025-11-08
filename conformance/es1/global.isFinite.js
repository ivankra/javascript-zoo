// ES1: 15.1.2.7 isFinite(number)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (isFinite(0)) {
  ok++;
} else {
  console.log("es1/global.isFinite.js: isFinite(0) failed");
}

if (isFinite(123)) {
  ok++;
} else {
  console.log("es1/global.isFinite.js: isFinite(123) failed");
}

if (isFinite(-456)) {
  ok++;
} else {
  console.log("es1/global.isFinite.js: isFinite(-456) failed");
}

if (!isFinite(1 / 0)) {
  ok++;
} else {
  console.log("es1/global.isFinite.js: isFinite(1/0) failed");
}

if (!isFinite(-1 / 0)) {
  ok++;
} else {
  console.log("es1/global.isFinite.js: isFinite(-1/0) failed");
}

if (!isFinite(0 / 0)) {
  ok++;
} else {
  console.log("es1/global.isFinite.js: isFinite(0/0) failed");
}

if (ok == 6) {
  console.log("es1/global.isFinite.js: OK");
} else {
  console.log("es1/global.isFinite.js: failed");
}
