// ES1: 15.7.3.6 Number.POSITIVE_INFINITY
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var inf = Number.POSITIVE_INFINITY;
if (inf > 1e308 && inf + inf == inf) {
  console.log("es1.Number.POSITIVE_INFINITY.js: OK");
} else {
  console.log("es1.Number.POSITIVE_INFINITY.js: FAIL");
}
