// ES3: 15.2.4.6 Object.prototype.isPrototypeOf (V)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

function Parent() {}
function Child() {}
Child.prototype = new Parent();

var child = new Child();

if (Child.prototype.isPrototypeOf(child)) {
  ok++;
} else {
  console.log("es3.Object.prototype.isPrototypeOf.js: direct prototype failed");
}

if (Parent.prototype.isPrototypeOf(child)) {
  ok++;
} else {
  console.log("es3.Object.prototype.isPrototypeOf.js: prototype chain failed");
}

if (Object.prototype.isPrototypeOf(child)) {
  ok++;
} else {
  console.log("es3.Object.prototype.isPrototypeOf.js: Object.prototype failed");
}

var obj = new Object();
if (!obj.isPrototypeOf(child)) {
  ok++;
} else {
  console.log("es3.Object.prototype.isPrototypeOf.js: unrelated object should be false failed");
}

if (!Child.prototype.isPrototypeOf(123)) {
  ok++;
} else {
  console.log("es3.Object.prototype.isPrototypeOf.js: non-object should be false failed");
}

if (!Child.prototype.isPrototypeOf("string")) {
  ok++;
} else {
  console.log("es3.Object.prototype.isPrototypeOf.js: string should be false failed");
}

if (!Child.prototype.isPrototypeOf(null)) {
  ok++;
} else {
  console.log("es3.Object.prototype.isPrototypeOf.js: null should be false failed");
}

if (ok == 7) {
  console.log("es3.Object.prototype.isPrototypeOf.js: OK");
} else {
  console.log("es3.Object.prototype.isPrototypeOf.js: FAIL");
}
