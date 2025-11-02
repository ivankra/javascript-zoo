// ES1: 15.8.2.15 Math.round(x)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (Math.round(3.5) == 4 && Math.round(3.4) == 3) {
  console.log("es1.Math.round.js: OK");
} else {
  console.log("es1.Math.round.js: FAIL");
}
