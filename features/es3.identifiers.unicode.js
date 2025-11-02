// ES3: 7.6 Identifiers
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var ж = 1;
var ш = ж + 42;
if (ш == 43) {
  ok++;
} else {
  console.log("es3.identifiers.unicode.js: cyrillic vars ж/ш failed");
}

// Unicode escape sequences are also permitted in identifiers
var \u0041 = 2;
if (A == 2) {
  ok++;
} else {
  console.log("es3.identifiers.unicode.js: \\u0041 vs A failed");
}

// $ and _  are permitted anywhere in an identifier.
// $ intended for mechanically generated code.
var _ = 3;
if (_ == 3) {
  ok++;
} else {
  console.log("es3.identifiers.unicode.js: _ identifier failed");
}

var $υ\u00E4r = 4;
if ($υär == 4) {
  ok++;
} else {
  console.log("es3.identifiers.unicode.js: $υ\\u00E4r vs υär failed");
}

if (ok == 4) {
  console.log("es3.identifiers.unicode.js: OK");
} else {
  console.log("es3.identifiers.unicode.js: FAIL");
}
