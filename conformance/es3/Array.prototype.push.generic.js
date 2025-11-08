// ES3: 15.4.4.7 Array.prototype.push ( [ item1 [ , item2 [ , … ] ] ] )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var obj1 = new Object();
obj1.length = 2;
obj1[0] = "a";
obj1[1] = "b";
var len1 = Array.prototype.push.call(obj1, "c");
if (len1 == 3 && obj1.length == 3 && obj1[2] == "c") {
  ok++;
} else {
  console.log("es3/Array.prototype.push.generic.js: push to object failed");
}

var obj2 = new Object();
obj2.length = 0;
var len2 = Array.prototype.push.call(obj2, 1, 2, 3);
if (len2 == 3 && obj2.length == 3 && obj2[0] == 1 && obj2[1] == 2 && obj2[2] == 3) {
  ok++;
} else {
  console.log("es3/Array.prototype.push.generic.js: push multiple to empty object failed");
}

var obj3 = new Object();
obj3.length = 1;
obj3[0] = 10;
var len3 = Array.prototype.push.call(obj3);
if (len3 == 1 && obj3.length == 1) {
  ok++;
} else {
  console.log("es3/Array.prototype.push.generic.js: push no args to object failed");
}

if (ok == 3) {
  console.log("es3/Array.prototype.push.generic.js: OK");
} else {
  console.log("es3/Array.prototype.push.generic.js: failed");
}
