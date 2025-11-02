// ES3: 15.11.4.1 Error.prototype.constructor
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (Error.prototype.constructor == Error) {
  console.log("es3.Error.prototype.constructor.js: OK");
} else {
  console.log("es3.Error.prototype.constructor.js: FAIL");
}
