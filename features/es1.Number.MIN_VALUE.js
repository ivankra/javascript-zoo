// ES1: 15.7.3.3 Number.MIN_VALUE
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (Number.MIN_VALUE > 0 && Number.MIN_VALUE < 1e-300) {
  console.log("es1.Number.MIN_VALUE.js: OK");
} else {
  console.log("es1.Number.MIN_VALUE.js: FAIL");
}
