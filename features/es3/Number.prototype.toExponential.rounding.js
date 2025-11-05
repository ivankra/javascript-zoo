// ES3: 15.7.4.6 Number.prototype.toExponential (fractionDigits)
// compat-table: ES5 > Number methods (small) > Number.prototype.toExponential rounds properly
// spec: https://262.ecma-international.org/#sec-number.prototype.toexponential
//
// Rounding away from zero in general ("If there are two such sets of
// e and n, pick the e and n for which n × 10^{e–f} is larger.")
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var res = (-6.9e-11).toExponential(4);
if (res === '-6.9000e-11') {
  ok++;
} else {
  console.log("es3/Number.prototype.toExponential.rounding.js: (-6.9e-11).toExponential(4) != '-6.9000e-11' (got: '" + res + "')");
}

res = (25).toExponential(0);
if (res === '3e+1') {
  ok++;
} else {
  console.log("es3/Number.prototype.toExponential.rounding.js: (25).toExponential(0) != '3e+1' (got: '" + res + "')");
}

res = (12345).toExponential(3);
if (res === '1.235e+4') {
  ok++;
} else {
  console.log("es3/Number.prototype.toExponential.rounding.js: (12345).toExponential(3) != '1.235e+4' (got: '" + res + "')");
}

res = (1.25).toExponential(1);
if (res === '1.3e+0') {
  ok++;
} else {
  console.log("es3/Number.prototype.toExponential.rounding.js: (1.25).toExponential(1) != '1.26e+0' (got: '" + res + "')");
}

// 1.255 is not exact in binary, slightly closer to 1.25 than 1.26 -> rounds down
res = (1.255).toExponential(2);
if (res === '1.25e+0') {
  ok++;
} else {
  console.log("es3/Number.prototype.toExponential.rounding.js: (1.255).toExponential(2) != '1.25e+0', got '" + res + "'");
}

if (ok === 5) {
  console.log("es3/Number.prototype.toExponential.rounding.js: OK");
} else {
  console.log("es3/Number.prototype.toExponential.rounding.js: failed");
}
