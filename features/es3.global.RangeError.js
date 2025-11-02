// ES3: 15.11.6.2 RangeError
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof RangeError == "function") {
  ok++;
} else {
  console.log("es3.global.RangeError.js: constructor failed");
}

if (RangeError.prototype.name == "RangeError") {
  ok++;
} else {
  console.log("es3.global.RangeError.js: name failed");
}

if (ok == 2) {
  console.log("es3.global.RangeError.js: OK");
} else {
  console.log("es3.global.RangeError.js: FAIL");
}
