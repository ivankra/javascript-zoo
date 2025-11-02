// ES3: 15.11.6.6 URIError
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof URIError == "function") {
  ok++;
} else {
  console.log("es3.global.URIError.js: constructor failed");
}

if (URIError.prototype.name == "URIError") {
  ok++;
} else {
  console.log("es3.global.URIError.js: name failed");
}

if (ok == 2) {
  console.log("es3.global.URIError.js: OK");
} else {
  console.log("es3.global.URIError.js: FAIL");
}
