// ES3: 15.4.4.9 Array.prototype.shift ( )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var obj1 = new Object();
obj1.length = 3;
obj1[0] = "a";
obj1[1] = "b";
obj1[2] = "c";
var shifted1 = Array.prototype.shift.call(obj1);
if (shifted1 == "a" && obj1.length == 2 && obj1[0] == "b" && obj1[1] == "c") {
  ok++;
} else {
  console.log("es3/Array.prototype.shift.generic.js: shift from object failed");
}

var obj2 = new Object();
obj2.length = 1;
obj2[0] = 42;
var shifted2 = Array.prototype.shift.call(obj2);
if (shifted2 == 42 && obj2.length == 0) {
  ok++;
} else {
  console.log("es3/Array.prototype.shift.generic.js: shift single element from object failed");
}

var obj3 = new Object();
obj3.length = 0;
var shifted3 = Array.prototype.shift.call(obj3);
if (obj3.length == 0 && typeof shifted3 == "undefined") {
  ok++;
} else {
  console.log("es3/Array.prototype.shift.generic.js: shift from empty object failed");
}

if (ok == 3) {
  console.log("es3/Array.prototype.shift.generic.js: OK");
} else {
  console.log("es3/Array.prototype.shift.generic.js: failed");
}
