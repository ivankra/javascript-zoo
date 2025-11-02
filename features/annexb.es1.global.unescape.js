// ES1: 15.1.2.6 unescape
// ES3: B.2.2 unescape (string)
// ES6: B.2.1.2 unescape (string)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var a = 'hello%20%28world%29%20%25%20%7E';
var b = unescape(a);
if (b == "hello (world) % ~") {
  console.log("es1.global.unescape.js: OK");
} else {
  console.log("es1.global.unescape.js: FAIL");
}
