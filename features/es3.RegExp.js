// ES3: 15.10.3.1 RegExp(pattern, flags)
// ES3: 15.10.4.1 new RegExp(pattern, flags)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var r1 = new RegExp("abc", "gi");
if (typeof r1 == "object") {
  ok++;
} else {
  console.log("es3.RegExp.js: new RegExp failed");
}

if (r1.global == true) {
  ok++;
} else {
  console.log("es3.RegExp.js: global flag failed");
}

if (r1.ignoreCase == true) {
  ok++;
} else {
  console.log("es3.RegExp.js: ignoreCase flag failed");
}

if (r1.multiline == false) {
  ok++;
} else {
  console.log("es3.RegExp.js: multiline flag failed");
}

if (r1.lastIndex == 0) {
  ok++;
} else {
  console.log("es3.RegExp.js: lastIndex failed");
}

var r2 = RegExp("test");
if (typeof r2 == "object") {
  ok++;
} else {
  console.log("es3.RegExp.js: RegExp as function failed");
}

var r3 = RegExp(r2);
if (r3 == r2) {
  ok++;
} else {
  console.log("es3.RegExp.js: RegExp passthrough failed");
}

if (ok == 7) {
  console.log("es3.RegExp.js: OK");
} else {
  console.log("es3.RegExp.js: FAIL");
}
