// ES3: 15.11.6.4 SyntaxError
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof SyntaxError == "function") {
  ok++;
} else {
  console.log("es3.global.SyntaxError.js: constructor failed");
}

if (SyntaxError.prototype.name == "SyntaxError") {
  ok++;
} else {
  console.log("es3.global.SyntaxError.js: name failed");
}

if (ok == 2) {
  console.log("es3.global.SyntaxError.js: OK");
} else {
  console.log("es3.global.SyntaxError.js: FAIL");
}
