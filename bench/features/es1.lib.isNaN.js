// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a = 0;
if (isNaN(a)) { console.log("es1.lib.isNaN.js: isNaN(0)"); } else { ok += 1; }

var b = a / a;
if (isNaN(b)) { ok += 1; } else { console.log("es1.lib.isNaN.js: !isNaN(0/0)"); }

if (ok == 2) {
  console.log("es1.lib.isNaN.js: OK");
}
