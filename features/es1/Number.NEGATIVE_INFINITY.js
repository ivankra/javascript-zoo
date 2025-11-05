// ES1: 15.7.3.5 Number.NEGATIVE_INFINITY
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (Number.NEGATIVE_INFINITY < 0 && Number.NEGATIVE_INFINITY < -1e308) {
  console.log("es1/Number.NEGATIVE_INFINITY.js: OK");
} else {
  console.log("es1/Number.NEGATIVE_INFINITY.js: failed");
}
