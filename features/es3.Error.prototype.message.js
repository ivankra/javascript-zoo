// ES3: 15.11.4.3 Error.prototype.message
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (typeof Error.prototype.message == "string") {
  console.log("es3.Error.prototype.message.js: OK");
} else {
  console.log("es3.Error.prototype.message.js: FAIL");
}
