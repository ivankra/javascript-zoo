// ES1: 15.4.4.5 Array.prototype.sort(comparefn)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var obj = new Object();
obj.length = 4;
obj[0] = "d";
obj[1] = "a";
obj[2] = "c";
obj[3] = "b";
obj.sort = Array.prototype.sort;

obj.sort();
if (obj[0] == "a" && obj[1] == "b" && obj[2] == "c" && obj[3] == "d") {
  console.log("es1.Array.prototype.sort.generic.js: OK");
} else {
  console.log("es1.Array.prototype.sort.generic.js: FAIL");
}
