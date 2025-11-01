// ES1: 15.7.3.2 Number.MAX_VALUE
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (Number.MAX_VALUE > 1e308) {
  console.log("es1.Number.MAX_VALUE.js: OK");
} else {
  console.log("es1.Number.MAX_VALUE.js: FAIL");
}
