// ES3: 15.4.4.13 Array.prototype.unshift ( [ item1 [ , item2 [ , … ] ] ] )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var obj1 = new Object();
obj1.length = 2;
obj1[0] = "b";
obj1[1] = "c";
var len1 = Array.prototype.unshift.call(obj1, "a");
if (len1 == 3 && obj1.length == 3 && obj1[0] == "a" && obj1[1] == "b" && obj1[2] == "c") {
  ok++;
} else {
  console.log("es3.Array.prototype.unshift.generic.js: unshift on object failed");
}

var obj2 = new Object();
obj2.length = 1;
obj2[0] = 30;
var len2 = Array.prototype.unshift.call(obj2, 10, 20);
if (len2 == 3 && obj2.length == 3 && obj2[0] == 10 && obj2[1] == 20 && obj2[2] == 30) {
  ok++;
} else {
  console.log("es3.Array.prototype.unshift.generic.js: unshift multiple on object failed");
}

var obj3 = new Object();
obj3.length = 0;
var len3 = Array.prototype.unshift.call(obj3, "x", "y");
if (len3 == 2 && obj3.length == 2 && obj3[0] == "x" && obj3[1] == "y") {
  ok++;
} else {
  console.log("es3.Array.prototype.unshift.generic.js: unshift on empty object failed");
}

if (ok == 3) {
  console.log("es3.Array.prototype.unshift.generic.js: OK");
} else {
  console.log("es3.Array.prototype.unshift.generic.js: FAIL");
}
