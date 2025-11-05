// ES3: 7.8.5 Regular Expression Literals
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var a = 10;
var b = 2;
var g = 2 /1/ 2;
var x = a /b/g;
if (x == 5) {
  ok++;
} else {
  console.log("es3/literals.regex.ambiguous.js: division failed");
}

var f1 = function() {
  return x, /b/g;
};
if (f1() == 5) {
  console.log("es3/literals.regex.ambiguous.js: return x, /b/g; failed");
} else {
  ok++;
}

var f2 = function() {
  var r = a
    /b/g;
  return r;
};
if (f2() == 5) {
  ok++;
} else {
  console.log("es3/literals.regex.ambiguous.js: var r = x<LF>/b/g; failed");
}

var f3 = function() {
  return /abc/;
};
if (f3().test("abc")) {
  ok++;
} else {
  console.log("es3/literals.regex.ambiguous.js: return /abc/ failed");
}

if (/xyz/.test("xyz")) {
  ok++;
} else {
  console.log("es3/literals.regex.ambiguous.js: if (/xyz/) failed");
}

var re2;
re2 = /foo/;
if (re2.test("foo")) {
  ok++;
} else {
  console.log("es3/literals.regex.ambiguous.js: re2 = /foo/ failed");
}

if (1 + /bar/.test("bar")) {
  ok++;
} else {
  console.log("es3/literals.regex.ambiguous.js: 1 + /bar/ failed");
}

var arr = [/baz/];
if (arr[0].test("baz")) {
  ok++;
} else {
  console.log("es3/literals.regex.ambiguous.js: [/baz/] failed");
}

var y = (/qux/.test("qux"));
if (y) {
  ok++;
} else {
  console.log("es3/literals.regex.ambiguous.js: (/qux/) failed");
}

if (ok == 9) {
  console.log("es3/literals.regex.ambiguous.js: OK");
} else {
  console.log("es3/literals.regex.ambiguous.js: failed");
}
