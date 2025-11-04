// ES1: 15.1.2.4 escape(string)
// ES3: B.2.1 escape (string)
// ESnext: https://262.ecma-international.org/#sec-escape-string
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var a = "hello (world) % ~";
var b = escape(a);
if (b == 'hello%20%28world%29%20%25%20%7E') {
  console.log("annexb.es1.global.escape.js: OK");
} else {
  console.log("annexb.es1.global.escape.js: FAIL");
}
