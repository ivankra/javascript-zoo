// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var a = "123 + 456";
var b = eval(a);
if (b == 579) {
  console.log("es1.eval.js: OK");
} else {
  console.log("es1.eval.js: FAIL");
}
