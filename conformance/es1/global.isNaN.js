// ES1: 15.1.2.6 isNaN(number)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (isNaN(0 / 0)) {
  ok++;
} else {
  console.log("es1/global.isNaN.js: !isNaN(0 / 0)");
}

if (!isNaN(0)) {
  ok++;
} else {
  console.log("es1/global.isNaN.js: isNaN(0)");
}

if (!isNaN(123)) {
  ok++;
} else {
  console.log("es1/global.isNaN.js: isNaN(123)");
}

if (!isNaN(-456)) {
  ok++;
} else {
  console.log("es1/global.isNaN.js: isNaN(-456)");
}

if (ok == 4) {
  console.log("es1/global.isNaN.js: OK");
} else {
  console.log("es1/global.isNaN.js: failed");
}
