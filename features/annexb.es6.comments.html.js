// ES6: B.1.3 HTML-like Comments
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

<!-- HTML comment
ok++;

var x = 1; <!-- inline HTML comment
ok++;

--> another HTML comment
ok++;

if (ok == 3) {
  console.log("annexb.es6.comments.html.js: OK");
} else {
  console.log("annexb.es6.comments.html.js: FAIL");
}
