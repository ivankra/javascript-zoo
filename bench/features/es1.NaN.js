// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;
var z = 0;
var na = z / z;
var u;

if (na != na) { ok += 1; } else { console.log("es1.NaN.js: !(0/0 != 0/0)"); }
if (na == na) { console.log("es1.NaN.js: 0/0 == 0/0"); } else { ok += 1; }
if (na == z) { console.log("es1.NaN.js: 0/0 == 0"); } else { ok += 1; }

var n = NaN;
if (n != n) { ok += 1; } else { console.log("es1.NaN.js: !(NaN != NaN)"); }
if (n == n) { console.log("es1.NaN.js: 0/0 == NaN"); } else { ok += 1; }
if (n != na) { ok += 1; } else { console.log("es1.NaN.js: !(NaN != 0/0)"); }
if (na == n) { console.log("es1.NaN.js: 0/0 == NaN"); } else { ok += 1; }

if (n == 0) { console.log("es1.NaN.js: NaN == 0"); } else { ok += 1; }
if ("" == n) { console.log("es1.NaN.js: '' == NaN"); } else { ok += 1; }
if (n == false) { console.log("es1.NaN.js: NaN == false"); } else { ok += 1; }
if (n == u) { console.log("es1.NaN.js: NaN == undefined"); } else { ok += 1; }
if (u == n) { console.log("es1.NaN.js: undefined == NaN"); } else { ok += 1; }
if (n == null) { console.log("es1.NaN.js: NaN == null"); } else { ok += 1; }

var inf = 1 / z;
if (n == inf) { console.log("es1.NaN.js: NaN == 1/0"); } else { ok += 1; }
if (na == inf) { console.log("es1.NaN.js: 0/0 == 1/0"); } else { ok += 1; }

var infinf = inf - inf;
if (infinf == infinf) { console.log("es1.NaN.js: 1/0 - 1/0 == itself"); } else { ok += 1; }

var s = "" + n;
if (s == "NaN") { ok += 1; } else { console.log("es1.NaN.js: ''+NaN != 'NaN'"); }

if (ok == 17) {
  console.log("es1.NaN.js: OK");
} else {
  console.log("es1.NaN.js: FAIL");
}
