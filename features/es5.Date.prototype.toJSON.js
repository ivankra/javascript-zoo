// ES5: 15.9.5.44 Date.prototype.toJSON ( key )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON
// compat-table: ES5 > Date methods (small) > Date.prototype.toJSON
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Date.prototype.toJSON === 'function') {
  ok++;
} else {
  console.log("es5.Date.prototype.toJSON.js: Date.prototype.toJSON not a function");
}

var result1 = Date.prototype.toJSON.call(new Date(NaN));
if (result1 === null) {
  ok++;
} else {
  console.log("es5.Date.prototype.toJSON.js: invalid date does not return null");
}

var d2 = new Date(0);
var result2 = d2.toJSON();
if (result2 === '1970-01-01T00:00:00.000Z') {
  ok++;
} else {
  console.log("es5.Date.prototype.toJSON.js: valid date format incorrect");
}

var d3 = new Date(Date.UTC(2025, 0, 3, 12, 0, 0, 0));
var result3 = d3.toJSON();
if (typeof result3 === 'string' && result3.indexOf('T') !== -1 && result3.indexOf('Z') !== -1) {
  ok++;
} else {
  console.log("es5.Date.prototype.toJSON.js: toJSON does not return ISO format string");
}

if (ok === 4) {
  console.log("es5.Date.prototype.toJSON.js: OK");
} else {
  console.log("es5.Date.prototype.toJSON.js: FAIL");
}
