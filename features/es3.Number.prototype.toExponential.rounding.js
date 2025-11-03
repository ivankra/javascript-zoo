// ES3: 15.7.4.6 Number.prototype.toExponential (fractionDigits)
// compat-table: ES5 > Number methods (small) > Number.prototype.toExponential rounds properly
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if ((-6.9e-11).toExponential(4) === '-6.9000e-11') {
  ok++;
} else {
  console.log("es3.Number.prototype.toExponential.rounding.js: (-6.9e-11).toExponential(4) incorrect");
}

if ((25).toExponential(0) === '3e+1') {
  ok++;
} else {
  console.log("es3.Number.prototype.toExponential.rounding.js: (25).toExponential(0) incorrect");
}

if ((1.255).toExponential(2) === '1.25e+0') {
  ok++;
} else {
  console.log("es3.Number.prototype.toExponential.rounding.js: (1.255).toExponential(2) incorrect");
}

if (ok === 3) {
  console.log("es3.Number.prototype.toExponential.rounding.js: OK");
} else {
  console.log("es3.Number.prototype.toExponential.rounding.js: FAIL");
}
