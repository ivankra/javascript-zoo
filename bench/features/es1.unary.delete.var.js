// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

a = 1;  // global variable (no var)
b = 2;

delete a;

if (typeof a == "undefined" && b == 2) {
  console.log("es1.unary.delete.var.js: OK");
} else {
  console.log("es1.unary.delete.var.js: FAIL");
}
