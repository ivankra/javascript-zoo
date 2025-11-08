// ES1: 15.5.4.4 String.prototype.charAt(pos)
// ES1: 15.5.4.5 String.prototype.charCodeAt(pos)
// ES1: 15.5.4.6 String.prototype.indexOf(searchString, position)
// ES1: 15.5.4.7 String.prototype.lastIndexOf(searchString, position)
// ES1: 15.5.4.8 String.prototype.split(separator)
// ES1: 15.5.4.10 String.prototype.substring(start, end)
// ES1: 15.5.4.11 String.prototype.toLowerCase
// ES1: 15.5.4.12 String.prototype.toUpperCase
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

function toStr() {
  return "hello world";
}

var obj = new Object();
obj.toString = toStr;
obj.charAt = String.prototype.charAt;
obj.charCodeAt = String.prototype.charCodeAt;
obj.indexOf = String.prototype.indexOf;
obj.lastIndexOf = String.prototype.lastIndexOf;
obj.split = String.prototype.split;
obj.substring = String.prototype.substring;
obj.toLowerCase = String.prototype.toLowerCase;
obj.toUpperCase = String.prototype.toUpperCase;

if (obj.charAt(1) == "e") {
  ok++;
} else {
  console.log("es1/String.generics.js: charAt failed");
}

if (obj.charCodeAt(0) == 104) {
  ok++;
} else {
  console.log("es1/String.generics.js: charCodeAt failed");
}

if (obj.indexOf("world") == 6) {
  ok++;
} else {
  console.log("es1/String.generics.js: indexOf failed");
}

if (obj.lastIndexOf("o") == 7) {
  ok++;
} else {
  console.log("es1/String.generics.js: lastIndexOf failed");
}

var arr = obj.split(" ");
if (arr.length == 2 && arr[0] == "hello" && arr[1] == "world") {
  ok++;
} else {
  console.log("es1/String.generics.js: split failed");
}

if (obj.substring(0, 5) == "hello") {
  ok++;
} else {
  console.log("es1/String.generics.js: substring failed");
}

if (obj.toLowerCase() == "hello world") {
  ok++;
} else {
  console.log("es1/String.generics.js: toLowerCase failed");
}

if (obj.toUpperCase() == "HELLO WORLD") {
  ok++;
} else {
  console.log("es1/String.generics.js: toUpperCase failed");
}

if (ok == 8) {
  console.log("es1/String.generics.js: OK");
} else {
  console.log("es1/String.generics.js: failed");
}
