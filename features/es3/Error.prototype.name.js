// ES3: 15.11.4.2 Error.prototype.name
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (Error.prototype.name == "Error") {
  console.log("es3/Error.prototype.name.js: OK");
} else {
  console.log("es3/Error.prototype.name.js: failed");
}
