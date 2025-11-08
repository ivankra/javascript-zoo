// ES3: 15.7.4.5 Number.prototype.toFixed (fractionDigits)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var n1 = 123.456;
var result1 = n1.toFixed(2);
if (result1 == "123.46") {
  ok++;
} else {
  console.log("es3/Number.prototype.toFixed.js: toFixed(2) failed");
}

var n2 = 123.456;
var result2 = n2.toFixed(0);
if (result2 == "123") {
  ok++;
} else {
  console.log("es3/Number.prototype.toFixed.js: toFixed(0) failed");
}

var n3 = 123.456;
var result3 = n3.toFixed();
if (result3 == "123") {
  ok++;
} else {
  console.log("es3/Number.prototype.toFixed.js: toFixed() undefined arg failed");
}

var n4 = -123.456;
var result4 = n4.toFixed(1);
if (result4 == "-123.5") {
  ok++;
} else {
  console.log("es3/Number.prototype.toFixed.js: negative number failed");
}

var n5 = NaN;
var result5 = n5.toFixed(2);
if (result5 == "NaN") {
  ok++;
} else {
  console.log("es3/Number.prototype.toFixed.js: NaN failed");
}

var n6 = 1000000000000000128;
var result6 = n6.toFixed(0);
if (result6 == "1000000000000000128") {
  ok++;
} else {
  console.log("es3/Number.prototype.toFixed.js: large number precision failed");
}

var n7 = 0.5;
var result7 = n7.toFixed(0);
if (result7 == "1") {
  ok++;
} else {
  console.log("es3/Number.prototype.toFixed.js: rounding failed");
}

if (ok == 7) {
  console.log("es3/Number.prototype.toFixed.js: OK");
} else {
  console.log("es3/Number.prototype.toFixed.js: failed");
}
