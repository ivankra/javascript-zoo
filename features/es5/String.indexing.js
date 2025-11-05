// ES5: 15.5.5.2 [[GetOwnProperty]] ( P )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Character_access
// compat-table: ES5 > String properties and methods (small) > Property access on strings
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if ("foobar"[3] === "b") {
  ok++;
} else {
  console.log("es5/String.indexing.js: 'foobar'[3] !== 'b'");
}

var s = "hello";
if (s[0] === "h" && s[4] === "o") {
  ok++;
} else {
  console.log("es5/String.indexing.js: test with variable failed");
}

if ("test"[10] === undefined) {
  ok++;
} else {
  console.log("es5/String.indexing.js: 'test'[10] !== undefined");
}

if (ok === 3) {
  console.log("es5/String.indexing.js: OK");
} else {
  console.log("es5/String.indexing.js: failed");
}
