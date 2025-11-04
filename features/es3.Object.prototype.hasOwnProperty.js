// ES3: 15.2.4.5 Object.prototype.hasOwnProperty (V)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

function Parent() {}
Parent.prototype.inherited = "value";

function Child() {
  this.own = "ownValue";
}
Child.prototype = new Parent();

var obj = new Child();

if (obj.hasOwnProperty("own")) {
  ok++;
} else {
  console.log("es3.Object.prototype.hasOwnProperty.js: own property failed");
}

if (!obj.hasOwnProperty("inherited")) {
  ok++;
} else {
  console.log("es3.Object.prototype.hasOwnProperty.js: inherited property should be false failed");
}

if (!obj.hasOwnProperty("nonexistent")) {
  ok++;
} else {
  console.log("es3.Object.prototype.hasOwnProperty.js: nonexistent property should be false failed");
}

var obj2 = new Object();
obj2.prop = 123;
if (obj2.hasOwnProperty("prop")) {
  ok++;
} else {
  console.log("es3.Object.prototype.hasOwnProperty.js: simple property failed");
}

var obj3 = new Object();
obj3["123"] = "numeric";
if (obj3.hasOwnProperty(123)) {
  ok++;
} else {
  console.log("es3.Object.prototype.hasOwnProperty.js: ToString conversion failed");
}

if (ok == 5) {
  console.log("es3.Object.prototype.hasOwnProperty.js: OK");
} else {
  console.log("es3.Object.prototype.hasOwnProperty.js: FAIL");
}
