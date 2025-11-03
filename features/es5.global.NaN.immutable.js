// ES5: 15.1.1.1 NaN
// compat-table: ES5 > Immutable globals (small) > NaN
//
// ES1/ES3: NaN had { DontEnum, DontDelete } but was writable.
// ES5 change: NaN is now immutable ([[Writable]]: false).
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

NaN = false;
if (typeof NaN === 'number') {
  ok++;
} else {
  console.log("es5.global.NaN.immutable.js: NaN is not a number after assignment");
}

if (NaN !== NaN) {
  ok++;
} else {
  console.log("es5.global.NaN.immutable.js: NaN === NaN after assignment");
}

NaN = Math.sqrt(-1);

if (ok === 2) {
  console.log("es5.global.NaN.immutable.js: OK");
} else {
  console.log("es5.global.NaN.immutable.js: FAIL");
}
