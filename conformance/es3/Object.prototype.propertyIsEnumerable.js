// ES3: 15.2.4.7 Object.prototype.propertyIsEnumerable (V)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var obj = new Object();
obj.enumProp = "value";

if (obj.propertyIsEnumerable("enumProp")) {
  ok++;
} else {
  console.log("es3/Object.prototype.propertyIsEnumerable.js: enumerable property failed");
}

if (!obj.propertyIsEnumerable("nonexistent")) {
  ok++;
} else {
  console.log("es3/Object.prototype.propertyIsEnumerable.js: nonexistent property should be false failed");
}

function Parent() {}
Parent.prototype.inherited = "value";
var child = new Parent();

if (!child.propertyIsEnumerable("inherited")) {
  ok++;
} else {
  console.log("es3/Object.prototype.propertyIsEnumerable.js: inherited property should be false failed");
}

var arr = new Array();
arr.push(1);
if (arr.propertyIsEnumerable(0)) {
  ok++;
} else {
  console.log("es3/Object.prototype.propertyIsEnumerable.js: Array index should be enumerable failed");
}

if (!arr.propertyIsEnumerable("length")) {
  ok++;
} else {
  console.log("es3/Object.prototype.propertyIsEnumerable.js: Array.length DontEnum failed");
}

if (!arr.propertyIsEnumerable("prototype")) {
  ok++;
} else {
  console.log("es3/Object.prototype.propertyIsEnumerable.js: Array.prototype DontEnum failed");
}

var obj2 = new Object();
obj2["123"] = "numeric";
if (obj2.propertyIsEnumerable(123)) {
  ok++;
} else {
  console.log("es3/Object.prototype.propertyIsEnumerable.js: ToString conversion failed");
}

if (ok == 7) {
  console.log("es3/Object.prototype.propertyIsEnumerable.js: OK");
} else {
  console.log("es3/Object.prototype.propertyIsEnumerable.js: failed");
}
