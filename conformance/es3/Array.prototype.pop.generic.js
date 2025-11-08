// ES3: 15.4.4.6 Array.prototype.pop ( )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var obj1 = new Object();
obj1.length = 3;
obj1[0] = "a";
obj1[1] = "b";
obj1[2] = "c";
var popped1 = Array.prototype.pop.call(obj1);
if (popped1 == "c" && obj1.length == 2) {
  ok++;
} else {
  console.log("es3/Array.prototype.pop.generic.js: pop from object failed");
}

var obj2 = new Object();
obj2.length = 1;
obj2[0] = 42;
var popped2 = Array.prototype.pop.call(obj2);
if (popped2 == 42 && obj2.length == 0) {
  ok++;
} else {
  console.log("es3/Array.prototype.pop.generic.js: pop single element from object failed");
}

var obj3 = new Object();
obj3.length = 0;
var popped3 = Array.prototype.pop.call(obj3);
if (obj3.length == 0) {
  ok++;
} else {
  console.log("es3/Array.prototype.pop.generic.js: pop from empty object failed");
}

if (ok == 3) {
  console.log("es3/Array.prototype.pop.generic.js: OK");
} else {
  console.log("es3/Array.prototype.pop.generic.js: failed");
}
