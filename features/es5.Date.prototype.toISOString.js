// ES5: 15.9.5.43 Date.prototype.toISOString ( )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
// compat-table: ES5 > Date methods (small) > Date.prototype.toISOString
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Date.prototype.toISOString === 'function') {
  ok++;
} else {
  console.log("es5.Date.prototype.toISOString.js: Date.prototype.toISOString not a function");
}

var d1 = new Date(2025, 0, 1, 0, 0, 0, 0);
var iso1 = d1.toISOString();
if (typeof iso1 === 'string' && iso1.indexOf('T') !== -1 && iso1.indexOf('Z') !== -1) {
  ok++;
} else {
  console.log("es5.Date.prototype.toISOString.js: toISOString does not return ISO format");
}

var d2 = new Date(0);
var iso2 = d2.toISOString();
if (iso2 === '1970-01-01T00:00:00.000Z') {
  ok++;
} else {
  console.log("es5.Date.prototype.toISOString.js: epoch date format incorrect");
}

var d3 = new Date(Date.UTC(2000, 5, 15, 12, 30, 45, 123));
var iso3 = d3.toISOString();
if (iso3 === '2000-06-15T12:30:45.123Z') {
  ok++;
} else {
  console.log("es5.Date.prototype.toISOString.js: date with milliseconds format incorrect");
}

var d4 = new Date(NaN);
var threw = false;
try {
  d4.toISOString();
} catch (e) {
  if (e instanceof RangeError) {
    threw = true;
  }
}
if (threw) {
  ok++;
} else {
  console.log("es5.Date.prototype.toISOString.js: invalid date does not throw RangeError");
}

if (ok === 5) {
  console.log("es5.Date.prototype.toISOString.js: OK");
} else {
  console.log("es5.Date.prototype.toISOString.js: FAIL");
}
