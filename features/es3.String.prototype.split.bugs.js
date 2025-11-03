// ES3: 15.5.4.14 String.prototype.split (separator, limit)
// compat-table: ES5 > String properties and methods (small) > String.prototype.split
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
//
// ES3-conformant behaviors that many ES3 implementations got wrong.
//
// https://github.com/es-shims/es5-shim/blob/master/es3.String.prototype.split.bugs.js#L1979
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var r1 = ''.split();
if (r1.length === 1) {
  ok++;
} else {
  console.log("es3.String.prototype.split.bugs.js: ''.split().length !== 1");
}
if (r1[0] === '') {
  ok++;
} else {
  console.log("es3.String.prototype.split.bugs.js: ''.split()[0] !== ''");
}

var r2 = ''.split(undefined);
if (r2.length === 1) {
  ok++;
} else {
  console.log("es3.String.prototype.split.bugs.js: ''.split(undefined).length !== 1");
}
if (r2[0] === '') {
  ok++;
} else {
  console.log("es3.String.prototype.split.bugs.js: ''.split(undefined)[0] !== ''");
}

var r3 = 'ab'.split();
if (r3.length === 1) {
  ok++;
} else {
  console.log("es3.String.prototype.split.bugs.js: 'ab'.split().length !== 1");
}
if (r3[0] === 'ab') {
  ok++;
} else {
  console.log("es3.String.prototype.split.bugs.js: 'ab'.split()[0] !== 'ab'");
}

var r4 = 'ab'.split(undefined);
if (r4.length === 1) {
  ok++;
} else {
  console.log("es3.String.prototype.split.bugs.js: 'ab'.split(undefined).length !== 1");
}
if (r4[0] === 'ab') {
  ok++;
} else {
  console.log("es3.String.prototype.split.bugs.js: 'ab'.split(undefined)[0] !== 'ab'");
}

if ('0'.split(undefined, 0).length === 0) {
  ok++;
} else {
  console.log("es3.String.prototype.split.bugs.js: '0'.split(undefined, 0).length !== 0");
}

if ('ab'.split(/(?:ab)*/).length === 2) {
  ok++;
} else {
  console.log("es3.String.prototype.split.bugs.js: 'ab'.split(/(?:ab)*/).length !== 2");
}

if ('.'.split(/(.?)(.?)/).length === 4) {
  ok++;
} else {
  console.log("es3.String.prototype.split.bugs.js: '.'.split(/(.?)(.?)/).length !== 4");
}

if ('tesst'.split(/(s)*/)[1] !== 't') {
  ok++;
} else {
  console.log("es3.String.prototype.split.bugs.js: 'tesst'.split(/(s)*/)[1] === 't'");
}

if ('test'.split(/(?:)/, -1).length === 4) {
  ok++;
} else {
  console.log("es3.String.prototype.split.bugs.js: 'test'.split(/(?:)/, -1).length !== 4");
}

if (''.split(/.?/).length === 0) {
  ok++;
} else {
  console.log("es3.String.prototype.split.bugs.js: ''.split(/.?/).length !== 0");
}

if ('.'.split(/()()/).length === 1) {
  ok++;
} else {
  console.log("es3.String.prototype.split.bugs.js: '.'.split(/()()/).length !== 1");
}

if (ok === 15) {
  console.log("es3.String.prototype.split.bugs.js: OK");
} else {
  console.log("es3.String.prototype.split.bugs.js: FAIL");
}
