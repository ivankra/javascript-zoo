// ES3: 15.11.6.3 ReferenceError
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof ReferenceError == "function") {
  ok++;
} else {
  console.log("es3.global.ReferenceError.js: constructor failed");
}

if (ReferenceError.prototype.name == "ReferenceError") {
  ok++;
} else {
  console.log("es3.global.ReferenceError.js: name failed");
}

if (ok == 2) {
  console.log("es3.global.ReferenceError.js: OK");
} else {
  console.log("es3.global.ReferenceError.js: FAIL");
}
