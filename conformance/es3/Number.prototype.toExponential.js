// ES3: 15.7.4.6 Number.prototype.toExponential (fractionDigits)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var n1 = 123.456;
var result1 = n1.toExponential(2);
if (result1 == "1.23e+2") {
  ok++;
} else {
  console.log("es3/Number.prototype.toExponential.js: toExponential(2) failed");
}

var n2 = 123.456;
var result2 = n2.toExponential();
if (result2.indexOf("e") != -1) {
  ok++;
} else {
  console.log("es3/Number.prototype.toExponential.js: toExponential() undefined arg failed");
}

var n3 = -123.456;
var result3 = n3.toExponential(2);
if (result3 == "-1.23e+2") {
  ok++;
} else {
  console.log("es3/Number.prototype.toExponential.js: negative number failed");
}

var n4 = NaN;
var result4 = n4.toExponential(2);
if (result4 == "NaN") {
  ok++;
} else {
  console.log("es3/Number.prototype.toExponential.js: NaN failed");
}

var n5 = 0;
var result5 = n5.toExponential(2);
if (result5 == "0.00e+0") {
  ok++;
} else {
  console.log("es3/Number.prototype.toExponential.js: zero failed");
}

var n6 = Infinity;
var result6 = n6.toExponential(2);
if (result6 == "Infinity") {
  ok++;
} else {
  console.log("es3/Number.prototype.toExponential.js: Infinity failed");
}

var n7 = 0.0001234;
var result7 = n7.toExponential(3);
if (result7 == "1.234e-4") {
  ok++;
} else {
  console.log("es3/Number.prototype.toExponential.js: small number failed");
}

if (ok == 7) {
  console.log("es3/Number.prototype.toExponential.js: OK");
} else {
  console.log("es3/Number.prototype.toExponential.js: failed");
}
