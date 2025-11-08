// ES1: 15.4.4.3 Array.prototype.join(separator)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var obj = new Object();
obj.length = 3;
obj[0] = "a";
obj[1] = "b";
obj[2] = "c";
obj.join = Array.prototype.join;

var result = obj.join(",");
if (result == "a,b,c") {
  console.log("es1/Array.prototype.join.generic.js: OK");
} else {
  console.log("es1/Array.prototype.join.generic.js: failed");
}
