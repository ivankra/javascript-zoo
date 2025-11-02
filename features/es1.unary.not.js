// ES1: 11.4.9 Logical NOT operator ( ! )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (!false == true) {
  ok++;
} else {
  console.log("es1.unary.not.js: !false failed");
}

if (!true == false) {
  ok++;
} else {
  console.log("es1.unary.not.js: !true failed");
}

if (!0 == true) {
  ok++;
} else {
  console.log("es1.unary.not.js: !0 failed");
}

if (!1 == false) {
  ok++;
} else {
  console.log("es1.unary.not.js: !1 failed");
}

if (ok == 4) {
  console.log("es1.unary.not.js: OK");
} else {
  console.log("es1.unary.not.js: FAIL");
}
