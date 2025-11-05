// ES3: 15.4.4.12 Array.prototype.splice (start, deleteCount [ , item1 [ , item2 [ , … ] ] ] )
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
var deleted1 = Array.prototype.splice.call(obj1, 1, 2);
if (deleted1.length == 2 && deleted1[0] == "b" && deleted1[1] == "c" && obj1.length == 2 && obj1[0] == "a" && obj1[1] == "d") {
  ok++;
} else {
  console.log("es3/Array.prototype.splice.generic.js: delete on object failed");
}

var obj2 = new Object();
obj2.length = 3;
obj2[0] = 1;
obj2[1] = 2;
obj2[2] = 3;
var deleted2 = Array.prototype.splice.call(obj2, 1, 0, 10);
if (deleted2.length == 0 && obj2.length == 4 && obj2[0] == 1 && obj2[1] == 10 && obj2[2] == 2 && obj2[3] == 3) {
  ok++;
} else {
  console.log("es3/Array.prototype.splice.generic.js: insert on object failed");
}

var obj3 = new Object();
obj3.length = 4;
obj3[0] = 1;
obj3[1] = 2;
obj3[2] = 3;
obj3[3] = 4;
var deleted3 = Array.prototype.splice.call(obj3, -2, 1);
if (deleted3.length == 1 && deleted3[0] == 3 && obj3.length == 3 && obj3[0] == 1 && obj3[1] == 2 && obj3[2] == 4) {
  ok++;
} else {
  console.log("es3/Array.prototype.splice.generic.js: negative start on object failed");
}

if (ok == 3) {
  console.log("es3/Array.prototype.splice.generic.js: OK");
} else {
  console.log("es3/Array.prototype.splice.generic.js: failed");
}
