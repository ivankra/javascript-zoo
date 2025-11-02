// Arithmetic on Date objects: operands are coerced to numbers via
// ToNumber -> ToPrimitive(..., hint Number) -> [[DefaultValue]] -> valueOf() ->
// milliseconds since epoch.
//
// ES1: 11.6 Additive operators
// ES1: 9.3 ToNumber
// ES1: 9.1 ToPrimitive
// ES1: 8.6.2.6 [[DefaultValue]](hint)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var d1 = new Date(2000, 0, 1);
var d2 = new Date(2000, 0, 2);
var diff = d2 - d1;
if (diff == 86400000) {
  console.log("es1.Date.diff.js: OK");
} else {
  console.log("es1.Date.diff.js: FAIL");
}
