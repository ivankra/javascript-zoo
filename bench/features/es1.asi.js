// ES1: 7.8 Automatic semicolon insertion
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

// return is a restricted production
// return [no LineTerminator here] Expression_opt ;
function test1(a, b) {
  return
    a + b
};
var res = test1(1, 2);
if (res == null) {
  ok++;
} else {
  console.log("es1.asi.js: FAIL: return<LF>");
}

// postfix ++/-- are restricted productions
// LeftHandSideExpression [no LineTerminator here] ++
function test2(a, b) {
  // var r=a; ++b;
  var r =
  a
  ++
  b
  return a*100 + b;
};
var res = test2(1, 5);
if (res == 106) {
  ok++;
} else {
  console.log("es1.asi.js: FAIL: a<LF> ++<LF> b");
}

// Ordinary cases: no ASI when can keep parsing, ASI when next token causes a grammar error

// c can be parsed as a function call
function h3(x) { h3.arg = x; return h3; }; h3.arg = 0; h3.print = test1;
function test3(a, b, c, d, e) {
  a = b + c
  (d + e).print()
};
test3(1, 2, h3, 3, 4);
if (h3.arg == 7) {
  ok++;
} else {
  console.log("es1.asi.js: FAIL: a = b + c<LF> (d + e).print()");
}

function test4(a, b) {
  var a
  a[0] = 10
  a[1] = 20
  a[2] = 30
  var res = a
    [2]
  return res
};
var res = test4(1, 2);
if (res == null) {
  ok++;
} else {
  console.log("es1.asi.js: FAIL: a<LF> [idx]");
}

function test5(a, b) {
  a -= 24
  ++b;
  return 100 * a + b;
};
var res = test5(50, 1);
if (res == 2602) {
  ok++;
} else {
  console.log("es1.asi.js: FAIL: a<LF> [idx]");
}

if (ok == 5) {
  console.log("es1.asi.js: OK");
} else {
  console.log("es1.asi.js: FAIL");
}
