// ES3: 15.10.6.3 RegExp.prototype.test(string)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var re = new RegExp("abc");

if (re.test("xabcy") == true) {
  ok++;
} else {
  console.log("es3.RegExp.prototype.test.js: match failed");
}

if (re.test("xyz") == false) {
  ok++;
} else {
  console.log("es3.RegExp.prototype.test.js: no match failed");
}

if (ok == 2) {
  console.log("es3.RegExp.prototype.test.js: OK");
} else {
  console.log("es3.RegExp.prototype.test.js: FAIL");
}
