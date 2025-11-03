// ES5: 7.6 Identifier Names and Identifiers
// compat-table: ES5 > Miscellaneous (medium) > Zero-width chars in identifiers
//
// ZWNJ (\u200C) and ZWJ (\u200D) are allowed in IdentifierPart in ES5.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var _\u200c\u200d = true;
if (_\u200c\u200d === true) {
  ok++;
} else {
  console.log("es5.source.zero-width-chars.js: zero-width chars in identifier failed");
}

if (ok === 1) {
  console.log("es5.source.zero-width-chars.js: OK");
} else {
  console.log("es5.source.zero-width-chars.js: FAIL");
}
