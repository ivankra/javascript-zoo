// ES3: 15.7.4.6 Number.prototype.toExponential (fractionDigits)
// compat-table: ES5 > Number methods (small) > Number.prototype.toExponential does not throw on edge cases
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var threw1 = false;
try {
  NaN.toExponential(Infinity);
} catch (e) {
  threw1 = true;
}
if (!threw1) {
  ok++;
} else {
  console.log("es3.Number.prototype.toExponential.edge-cases.js: NaN.toExponential(Infinity) throws");
}

var threw2 = false;
try {
  Infinity.toExponential(Infinity);
} catch (e) {
  threw2 = true;
}
if (!threw2) {
  ok++;
} else {
  console.log("es3.Number.prototype.toExponential.edge-cases.js: Infinity.toExponential(Infinity) throws");
}

if (ok === 2) {
  console.log("es3.Number.prototype.toExponential.edge-cases.js: OK");
} else {
  console.log("es3.Number.prototype.toExponential.edge-cases.js: FAIL");
}
