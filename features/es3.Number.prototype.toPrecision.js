// ES3: 15.7.4.7 Number.prototype.toPrecision (precision)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var n1 = 123.456;
var result1 = n1.toPrecision(5);
if (result1 == "123.46") {
  ok++;
} else {
  console.log("es3.Number.prototype.toPrecision.js: toPrecision(5) fixed notation failed");
}

var n2 = 123.456;
var result2 = n2.toPrecision();
if (result2 == "123.456") {
  ok++;
} else {
  console.log("es3.Number.prototype.toPrecision.js: toPrecision() undefined arg failed");
}

var n3 = NaN;
var result3 = n3.toPrecision(3);
if (result3 == "NaN") {
  ok++;
} else {
  console.log("es3.Number.prototype.toPrecision.js: NaN failed");
}

var n4 = Infinity;
var result4 = n4.toPrecision(3);
if (result4 == "Infinity") {
  ok++;
} else {
  console.log("es3.Number.prototype.toPrecision.js: Infinity failed");
}

var n5 = 0.0000001;
var result5 = n5.toPrecision(3);
if (result5 == "1.00e-7") {
  ok++;
} else {
  console.log("es3.Number.prototype.toPrecision.js: small number exponential notation failed");
}

var n6 = 0;
var result6 = n6.toPrecision(3);
if (result6 == "0.00") {
  ok++;
} else {
  console.log("es3.Number.prototype.toPrecision.js: zero failed");
}

var n7 = 1234567;
var result7 = n7.toPrecision(3);
if (result7 == "1.23e+6") {
  ok++;
} else {
  console.log("es3.Number.prototype.toPrecision.js: large number exponential notation failed");
}

if (ok == 7) {
  console.log("es3.Number.prototype.toPrecision.js: OK");
} else {
  console.log("es3.Number.prototype.toPrecision.js: FAIL");
}
