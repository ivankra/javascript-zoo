// ES1: 11.5 Multiplicative operators
// ES1: 11.6 Additive operators
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok, m, s, d, f, i, j;

ok = 0;
m = 9007199254740992;
s = "" + m;
if (s == "9007199254740992") { ok++; } else { console.log("es1/numbers.double.js: failed: converting max safe integer + 1 to string"); }
m++;
s = "" + m;
if (s == "9007199254740992") { ok++; }
d = m + 3;
s = "" + d;
if (s == "9007199254740996") { ok++; }

d = 99999.5;
i = 100000;
if (i == d) { ok = 0; }
d += 0.5;
if (i == d) { ok++; } else { console.log("es1/numbers.double.js: 99999.5 + 0.5 != 100000"); }

j = 1e5;
if (i == j) { ok++; }

i = -0;
j = 0;
if (i == j) { ok++; }

if (ok == 6) {
  console.log("es1/numbers.double.js: OK");
} else {
  console.log("es1/numbers.double.js: failed");
}
