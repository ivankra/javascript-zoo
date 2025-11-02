// ES3: 15.10.6.1 RegExp.prototype.constructor
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (RegExp.prototype.constructor == RegExp) {
  console.log("es3.RegExp.prototype.constructor.js: OK");
} else {
  console.log("es3.RegExp.prototype.constructor.js: FAIL");
}
