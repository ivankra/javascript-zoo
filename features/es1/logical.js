// ES1: 11.11 Binary logical operators
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var t = true;
var f = false;

if (t && t) {
  ok++;
} else {
  console.log("es1/logical.js: true && true failed");
}

if (t && f) {
  console.log("es1/logical.js: true && false failed");
} else {
  ok++;
}

if (f && t) {
  console.log("es1/logical.js: false && true failed");
} else {
  ok++;
}

if (f && f) {
  console.log("es1/logical.js: false && false failed");
} else {
  ok++;
}

if (t || t) {
  ok++;
} else {
  console.log("es1/logical.js: true || true failed");
}

if (t || f) {
  ok++;
} else {
  console.log("es1/logical.js: true || false failed");
}

if (f || t) {
  ok++;
} else {
  console.log("es1/logical.js: false || true failed");
}

if (f || f) {
  console.log("es1/logical.js: false || false failed");
} else {
  ok++;
}

var i = 0;
var j = 0;

if (f && (i = 1)) {
  console.log("es1/logical.js: false && (i = 1) failed");
} else {
  ok++;
}

if (i == 0) {
  ok++;
} else {
  console.log("es1/logical.js: && short-circuit failed, i=" + i);
}

if (t || (j = 1)) {
  ok++;
} else {
  console.log("es1/logical.js: true || (j = 1) failed");
}

if (j == 0) {
  ok++;
} else {
  console.log("es1/logical.js: || short-circuit failed, j=" + j);
}

if (ok == 12) {
  console.log("es1/logical.js: OK");
} else {
  console.log("es1/logical.js: failed");
}
