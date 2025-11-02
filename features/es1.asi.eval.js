// ES1: 7.8 Automatic semicolon insertion
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var a = eval("{ 1\n2 } 3");
if (a == 3) {
  console.log("es1.asi.eval.js: OK");
} else {
  console.log("es1.asi.eval.js: FAIL");
}
