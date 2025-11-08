// ES3: 15.5.4.11 String.prototype.replace (searchValue, replaceValue)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var obj1 = new Object();
obj1.toString = function() { return "hello world"; };
var r1 = String.prototype.replace.call(obj1, "world", "there");
if (r1 == "hello there") {
  ok++;
} else {
  console.log("es3/String.prototype.replace.generic.js: object with toString failed");
}

var num = new Number(12345);
var r2 = String.prototype.replace.call(num, "3", "X");
if (r2 == "12X45") {
  ok++;
} else {
  console.log("es3/String.prototype.replace.generic.js: Number failed");
}

var bool = new Boolean(true);
var r3 = String.prototype.replace.call(bool, "t", "T");
if (r3 == "True") {
  ok++;
} else {
  console.log("es3/String.prototype.replace.generic.js: Boolean failed");
}

var arr = new Array();
arr.push("a");
arr.push("b");
arr.push("c");
var r4 = String.prototype.replace.call(arr, ",", "-");
if (r4 == "a-b,c") {
  ok++;
} else {
  console.log("es3/String.prototype.replace.generic.js: Array failed");
}

var obj2 = new Object();
obj2.toString = function() { return "test123"; };
var r5 = String.prototype.replace.call(obj2, /(\d+)/, "[$1]");
if (r5 == "test[123]") {
  ok++;
} else {
  console.log("es3/String.prototype.replace.generic.js: regex with capture failed");
}

if (ok == 5) {
  console.log("es3/String.prototype.replace.generic.js: OK");
} else {
  console.log("es3/String.prototype.replace.generic.js: failed");
}
