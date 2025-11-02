// ES3: 15.5.4.6 String.prototype.concat ( [ string1 [ , string2 [ , … ] ] ] )
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s1 = "Hello";
var result1 = s1.concat(" ", "World");
if (result1 == "Hello World") {
  ok++;
} else {
  console.log("es3.String.prototype.concat.js: concat multiple strings failed");
}

var s2 = "foo";
var result2 = s2.concat("bar");
if (result2 == "foobar") {
  ok++;
} else {
  console.log("es3.String.prototype.concat.js: concat single string failed");
}

var s3 = "test";
var result3 = s3.concat();
if (result3 == "test") {
  ok++;
} else {
  console.log("es3.String.prototype.concat.js: concat with no arguments failed");
}

var s4 = "";
var result4 = s4.concat("a", "b", "c");
if (result4 == "abc") {
  ok++;
} else {
  console.log("es3.String.prototype.concat.js: concat on empty string failed");
}

var s5 = "x";
var result5 = s5.concat(1, true, null);
if (result5 == "x1truenull") {
  ok++;
} else {
  console.log("es3.String.prototype.concat.js: concat with type conversion failed");
}

if (ok == 5) {
  console.log("es3.String.prototype.concat.js: OK");
} else {
  console.log("es3.String.prototype.concat.js: FAIL");
}
