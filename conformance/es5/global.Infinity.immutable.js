// ES5: 15.1.1.2 Infinity
// compat-table: ES5 > Immutable globals (small) > Infinity
//
// ES1/ES3: Infinity had { DontEnum, DontDelete } but was writable.
// ES5 change: Infinity is now immutable ([[Writable]]: false).
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

Infinity = false;
if (typeof Infinity === 'number') {
  ok++;
} else {
  console.log("es5/global.Infinity.immutable.js: Infinity is not a number after assignment");
}

if (Infinity > 0 && Infinity > 1000000000) {
  ok++;
} else {
  console.log("es5/global.Infinity.immutable.js: Infinity not positive infinity after assignment");
}

Infinity = 1/0;

if (ok === 2) {
  console.log("es5/global.Infinity.immutable.js: OK");
} else {
  console.log("es5/global.Infinity.immutable.js: failed");
}
