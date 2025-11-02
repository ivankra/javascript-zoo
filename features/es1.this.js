// ES1: 10.1.7 This
// ES1: 11.1.1 The this keyword
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var obj = new Object();
obj.value = 42;
obj.getValue = function() {
  return this.value;
};

if (obj.getValue() == 42) {
  ok++;
} else {
  console.log("es1.this.js: method call failed");
}

function Constructor() {
  this.x = 10;
}
var instance = new Constructor();
if (instance.x == 10) {
  ok++;
} else {
  console.log("es1.this.js: constructor failed");
}

if (ok == 2) {
  console.log("es1.this.js: OK");
} else {
  console.log("es1.this.js: FAIL");
}
