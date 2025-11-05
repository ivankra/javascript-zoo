// ES3: 11.2.5 Function Expressions
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var result1 = (function() { return 42; })();
if (result1 == 42) {
  ok++;
} else {
  console.log("es3/function-expressions.IIFE.js: basic IIFE failed");
}

var result2 = (function(x) { return x * 2; })(5);
if (result2 == 10) {
  ok++;
} else {
  console.log("es3/function-expressions.IIFE.js: IIFE with parameter failed");
}

var result3 = (function(a, b) { return a + b; })(3, 7);
if (result3 == 10) {
  ok++;
} else {
  console.log("es3/function-expressions.IIFE.js: IIFE with multiple parameters failed");
}

var counter = (function() {
  var count = 0;
  return function() {
    count++;
    return count;
  };
})();
if (counter() == 1 && counter() == 2) {
  ok++;
} else {
  console.log("es3/function-expressions.IIFE.js: IIFE closure failed");
}

if (ok == 4) {
  console.log("es3/function-expressions.IIFE.js: OK");
} else {
  console.log("es3/function-expressions.IIFE.js: failed");
}
