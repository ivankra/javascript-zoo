// ES3: 15.10.2.10 CharacterEscape
// ControlEscape :: one of t n v f r
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (/\t/.test("\t")) {
  ok++;
} else {
  console.log("es3.regex.escape.control.js: \\t failed");
}

if (/\n/.test("\n")) {
  ok++;
} else {
  console.log("es3.regex.escape.control.js: \\n failed");
}

if (/\v/.test("\v")) {
  ok++;
} else {
  console.log("es3.regex.escape.control.js: \\v failed");
}

if (/\f/.test("\f")) {
  ok++;
} else {
  console.log("es3.regex.escape.control.js: \\f failed");
}

if (/\r/.test("\r")) {
  ok++;
} else {
  console.log("es3.regex.escape.control.js: \\r failed");
}

if (ok == 5) {
  console.log("es3.regex.escape.control.js: OK");
} else {
  console.log("es3.regex.escape.control.js: FAIL");
}
