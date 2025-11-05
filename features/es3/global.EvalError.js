// ES3: 15.11.6.1 EvalError
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof EvalError == "function") {
  ok++;
} else {
  console.log("es3/global.EvalError.js: constructor failed");
}

if (EvalError.prototype.name == "EvalError") {
  ok++;
} else {
  console.log("es3/global.EvalError.js: name failed");
}

if (ok == 2) {
  console.log("es3/global.EvalError.js: OK");
} else {
  console.log("es3/global.EvalError.js: failed");
}
