// ES3: 15.2.4.3 Object.prototype.toLocaleString ( )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var o1 = new Object();
var s1 = o1.toLocaleString();
if (s1 == "[object Object]") {
  ok++;
} else {
  console.log("es3.Object.prototype.toLocaleString.js: basic toLocaleString failed");
}

var o2 = new Object();
var s2 = o2.toLocaleString();
var s3 = o2.toString();
if (s2 == s3) {
  ok++;
} else {
  console.log("es3.Object.prototype.toLocaleString.js: toLocaleString should equal toString failed");
}

function CustomObject() {}
CustomObject.prototype.toString = function() { return "custom"; };
var o3 = new CustomObject();
var s4 = o3.toLocaleString();
if (s4 == "custom") {
  ok++;
} else {
  console.log("es3.Object.prototype.toLocaleString.js: custom toString failed");
}

if (ok == 3) {
  console.log("es3.Object.prototype.toLocaleString.js: OK");
} else {
  console.log("es3.Object.prototype.toLocaleString.js: FAIL");
}
