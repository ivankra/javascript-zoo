// ES1: 15.4.4.4 Array.prototype.reverse()
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var obj = new Object();
obj.length = 3;
obj[0] = "a";
obj[1] = "b";
obj[2] = "c";
obj.reverse = Array.prototype.reverse;

obj.reverse();
if (obj[0] == "c" && obj[1] == "b" && obj[2] == "a") {
  console.log("es1/Array.prototype.reverse.generic.js: OK");
} else {
  console.log("es1/Array.prototype.reverse.generic.js: failed");
}
