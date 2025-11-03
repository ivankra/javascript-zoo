// ES5: 15.1.2.2 parseInt (string , radix)
// compat-table: ES5 > Miscellaneous (medium) > parseInt ignores leading zeros
//
// parseInt() in ES5 no longer treats strings beginning with '0' as octal,
// whereas ES3 left it up to the implementation whether to interpret
// '010' as octal (8) or decimal (10).
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (parseInt('010') === 10) {
  ok++;
} else {
  console.log("es5.global.parseInt.no-octal.js: parseInt('010') !== 10");
}

if (parseInt('0100') === 100) {
  ok++;
} else {
  console.log("es5.global.parseInt.no-octal.js: parseInt('0100') !== 100");
}

if (parseInt('077') === 77) {
  ok++;
} else {
  console.log("es5.global.parseInt.no-octal.js: parseInt('077') !== 77");
}

if (ok === 3) {
  console.log("es5.global.parseInt.no-octal.js: OK");
} else {
  console.log("es5.global.parseInt.no-octal.js: FAIL");
}
