// ES5: 15.1.1.3 undefined
// compat-table: ES5 > Immutable globals (small) > undefined
//
// In ES1, undefined did not exist as a global property.
// In ES3, undefined had { DontEnum, DontDelete } but was writable.
// In ES5, undefined is now immutable ([[Writable]]: false).
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

undefined = 12345;
if (typeof undefined === 'undefined') {
  ok++;
} else {
  console.log("es5.global.undefined.immutable.js: undefined is not undefined after assignment");
}

undefined = void 0;

if (ok === 1) {
  console.log("es5.global.undefined.immutable.js: OK");
} else {
  console.log("es5.global.undefined.immutable.js: FAIL");
}
