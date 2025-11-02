// ES3: 15.11.6.5 TypeError
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof TypeError == "function") {
  ok++;
} else {
  console.log("es3.global.TypeError.js: constructor failed");
}

if (TypeError.prototype.name == "TypeError") {
  ok++;
} else {
  console.log("es3.global.TypeError.js: name failed");
}

if (ok == 2) {
  console.log("es3.global.TypeError.js: OK");
} else {
  console.log("es3.global.TypeError.js: FAIL");
}
