// ES3: 15.7.4.6 Number.prototype.toExponential (fractionDigits)
// compat-table: ES5 > Number methods (small) > Number.prototype.toExponential throws on ±Infinity fractionDigits
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var threw1 = false;
try {
  (1).toExponential(Infinity);
} catch (e) {
  if (e instanceof RangeError) {
    threw1 = true;
  }
}
if (threw1) {
  ok++;
} else {
  console.log("es3.Number.prototype.toExponential.throws-infinity.js: toExponential(Infinity) does not throw RangeError");
}

var threw2 = false;
try {
  (1).toExponential(-Infinity);
} catch (e) {
  if (e instanceof RangeError) {
    threw2 = true;
  }
}
if (threw2) {
  ok++;
} else {
  console.log("es3.Number.prototype.toExponential.throws-infinity.js: toExponential(-Infinity) does not throw RangeError");
}

if (ok === 2) {
  console.log("es3.Number.prototype.toExponential.throws-infinity.js: OK");
} else {
  console.log("es3.Number.prototype.toExponential.throws-infinity.js: FAIL");
}
