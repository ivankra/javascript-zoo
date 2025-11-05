// ES3: 15.4.4.10 Array.prototype.slice (start, end)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var obj1 = new Object();
obj1.length = 4;
obj1[0] = "a";
obj1[1] = "b";
obj1[2] = "c";
obj1[3] = "d";
var sliced1 = Array.prototype.slice.call(obj1, 1, 3);
if (sliced1.length == 2 && sliced1[0] == "b" && sliced1[1] == "c") {
  ok++;
} else {
  console.log("es3/Array.prototype.slice.generic.js: slice object with start and end failed");
}

var obj2 = new Object();
obj2.length = 3;
obj2[0] = 10;
obj2[1] = 20;
obj2[2] = 30;
var sliced2 = Array.prototype.slice.call(obj2, 1);
if (sliced2.length == 2 && sliced2[0] == 20 && sliced2[1] == 30) {
  ok++;
} else {
  console.log("es3/Array.prototype.slice.generic.js: slice object with start only failed");
}

var obj3 = new Object();
obj3.length = 3;
obj3[0] = 1;
obj3[1] = 2;
obj3[2] = 3;
var sliced3 = Array.prototype.slice.call(obj3, -2);
if (sliced3.length == 2 && sliced3[0] == 2 && sliced3[1] == 3) {
  ok++;
} else {
  console.log("es3/Array.prototype.slice.generic.js: slice object with negative start failed");
}

if (ok == 3) {
  console.log("es3/Array.prototype.slice.generic.js: OK");
} else {
  console.log("es3/Array.prototype.slice.generic.js: failed");
}
