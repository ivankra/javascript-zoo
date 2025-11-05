// ES1: 15.8.2.1 Math.abs(x)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (Math.abs(-5) == 5 && Math.abs(5) == 5) {
  console.log("es1/Math.abs.js: OK");
} else {
  console.log("es1/Math.abs.js: failed");
}
