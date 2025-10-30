// Standard: ES1 11.9 Equality operators
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var i = 123;
var j = 124;
var z = 0;
var nz = -0;
var one = 1;
var e = "";
var s = "123";
var t = "0123";
var f = 123.0;
var n = null;
var u;
var fa = false;
var tr = true;
var space = " ";
var abc = "abc";
var five = "5";
var six = "6";

if (i == s) { ok += 1; } else { console.log("es1.coercions.js: 123 != '123'"); }
if (i == t) { ok += 1; } else { console.log("es1.coercions.js: 123 != '0123'"); }
if (i == f) { ok += 1; } else { console.log("es1.coercions.js: 123 != 123.0"); }
if (i != e) { ok += 1; } else { console.log("es1.coercions.js: 123 == ''"); }
if (z == e) { ok += 1; } else { console.log("es1.coercions.js: 0 != ''"); }
if (s == f) { ok += 1; } else { console.log("es1.coercions.js: '123' != 123.0"); }
if (f == t) { ok += 1; } else { console.log("es1.coercions.js: 123.0 != '0123'"); }
if (n == u) { ok += 1; } else { console.log("es1.coercions.js: null != undefined"); }
if (z == nz) { ok += 1; } else { console.log("es1.coercions.js: 0 != -0"); }
if (z == n) { console.log("es1.coercions.js: 0 == null"); } else { ok += 1; }
if (z == u) { console.log("es1.coercions.js: 0 == undefined"); } else { ok += 1; }
if (fa == fa) { ok += 1; } else { console.log("es1.coercions.js: false != false"); }
if (fa != tr) { ok += 1; } else { console.log("es1.coercions.js: false == true"); }
if (tr == one) { ok += 1; } else { console.log("es1.coercions.js: true != 1"); }
if (fa == z) { ok += 1; } else { console.log("es1.coercions.js: false != 0"); }
if (tr != z) { ok += 1; } else { console.log("es1.coercions.js: true == 0"); }
if (fa != e) { console.log("es1.coercions.js: false != ''"); } else { ok += 1; }

if (j > i) { ok += 1; } else { console.log("es1.coercions.js: 124 <= 123"); }
if (i < j) { ok += 1; } else { console.log("es1.coercions.js: 123 >= 124"); }
if (i > s) { console.log("es1.coercions.js: 123 > '123'"); } else { ok += 1; }
if (s < j) { ok += 1; } else { console.log("es1.coercions.js: '123' >= 124"); }
if (tr > fa) { ok += 1; } else { console.log("es1.coercions.js: true <= false"); }
if (tr >= one) { ok += 1; } else { console.log("es1.coercions.js: true < 1"); }
if (fa <= z) { ok += 1; } else { console.log("es1.coercions.js: false > 0"); }

if (i + e == "123") { ok += 1; } else { console.log("es1.coercions.js: 123 + '' != '123'"); }
if (e + i == "123") { ok += 1; } else { console.log("es1.coercions.js: '' + 123 != '123'"); }
if (s + five == "1235") { ok += 1; } else { console.log("es1.coercions.js: '123' + '5' != '1235'"); }
if (five + i == "5123") { ok += 1; } else { console.log("es1.coercions.js: '5' + 123 != '5123'"); }
if (tr + e == "true") { ok += 1; } else { console.log("es1.coercions.js: true + '' != 'true'"); }
if (n + e == "null") { ok += 1; } else { console.log("es1.coercions.js: null + '' != 'null'"); }
if (tr + fa == 1) { ok += 1; } else { console.log("es1.coercions.js: true + false != 1"); }
if (tr + tr == 2) { ok += 1; } else { console.log("es1.coercions.js: true + true != 2"); }

// ToNumber coercions
if (i - z == 123) { ok += 1; } else { console.log("es1.coercions.js: 123 - 0 != 123"); }
if (i - s == 0) { ok += 1; } else { console.log("es1.coercions.js: 123 - '123' != 0"); }
if (five - one == 4) { ok += 1; } else { console.log("es1.coercions.js: '5' - 1 != 4"); }
if (i - e == 123) { ok += 1; } else { console.log("es1.coercions.js: 123 - '' != 123"); }
if (tr - fa == 1) { ok += 1; } else { console.log("es1.coercions.js: true - false != 1"); }
if (five - tr == 4) { ok += 1; } else { console.log("es1.coercions.js: '5' - true != 4"); }
if (i * one == 123) { ok += 1; } else { console.log("es1.coercions.js: 123 * 1 != 123"); }
if (five * six == 30) { ok += 1; } else { console.log("es1.coercions.js: '5' * '6' != 30"); }
if (i * e == 0) { ok += 1; } else { console.log("es1.coercions.js: 123 * '' != 0"); }
if (tr * five == 5) { ok += 1; } else { console.log("es1.coercions.js: true * '5' != 5"); }
if (fa * i == 0) { ok += 1; } else { console.log("es1.coercions.js: false * 123 != 0"); }
if (i / one == 123) { ok += 1; } else { console.log("es1.coercions.js: 123 / 1 != 123"); }
if (six / five == 1.2) { ok += 1; } else { console.log("es1.coercions.js: '6' / '5' != 1.2"); }
if (fa / one == 0) { ok += 1; } else { console.log("es1.coercions.js: false / 1 != 0"); }
if (i % one == 0) { ok += 1; } else { console.log("es1.coercions.js: 123 % 1 != 0"); }
if (five % six == 5) { ok += 1; } else { console.log("es1.coercions.js: '5' % '6' != 5"); }

if (ok == 48) {
  console.log("es1.coercions.js: OK");
} else {
  console.log("es1.coercions.js: FAIL");
  //console.log(ok);
}
