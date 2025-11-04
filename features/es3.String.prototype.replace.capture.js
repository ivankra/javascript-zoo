// ES3: 15.5.4.11 String.prototype.replace (searchValue, replaceValue)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var s1 = "abc";
var r1 = s1.replace(/(b)/, "[$1]");
if (r1 == "a[b]c") {
  ok++;
} else {
  console.log("es3.String.prototype.replace.capture.js: $1 failed");
}

var s2 = "abc";
var r2 = s2.replace(/(a)(b)(c)/, "$3$2$1");
if (r2 == "cba") {
  ok++;
} else {
  console.log("es3.String.prototype.replace.capture.js: $1 $2 $3 failed");
}

var s3 = "abc";
var r3 = s3.replace(/(a)(b)?/, "$1-$2");
if (r3 == "a-bc") {
  ok++;
} else {
  console.log("es3.String.prototype.replace.capture.js: undefined capture failed");
}

var s4 = "$1,$2";
var r4 = s4.replace(/(\$(\d))/g, "$$1-$1$2");
if (r4 == "$1-$11,$1-$22") {
  ok++;
} else {
  console.log("es3.String.prototype.replace.capture.js: spec example failed");
}

var s5 = "abcdefghij";
var r5 = s5.replace(/(a)(b)(c)(d)(e)(f)(g)(h)(i)(j)/, "$01$02$03$04$05$06$07$08$09$10");
if (r5 == "abcdefghij") {
  ok++;
} else {
  console.log("es3.String.prototype.replace.capture.js: $nn 10 captures failed");
}

var s6 = "abcdefghij";
var r6 = s6.replace(/(a)(b)(c)(d)(e)(f)(g)(h)(i)(j)/, "$10-$09-$08-$07-$06-$05-$04-$03-$02-$01");
if (r6 == "j-i-h-g-f-e-d-c-b-a") {
  ok++;
} else {
  console.log("es3.String.prototype.replace.capture.js: $nn reverse order failed");
}

var s7 = "test";
var r7 = s7.replace(/(t)(e)(s)(t)/, "$4$3$2$1");
if (r7 == "tset") {
  ok++;
} else {
  console.log("es3.String.prototype.replace.capture.js: 4 captures reverse failed");
}

if (ok == 7) {
  console.log("es3.String.prototype.replace.capture.js: OK");
} else {
  console.log("es3.String.prototype.replace.capture.js: FAIL");
}
