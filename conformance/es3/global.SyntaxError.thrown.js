// ES3: 15.1.2.1 eval (x)
// ES3: 15.11.6.4 SyntaxError
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var caught = 0;
try {
  eval("var x = ;");
} catch (e) {
  if (e.name == "SyntaxError") {
    ok++;
  } else {
    console.log("es3/global.SyntaxError.thrown.js: wrong exception type");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3/global.SyntaxError.thrown.js: no exception thrown for invalid syntax");
}

caught = 0;
try {
  eval("var s = 'unclosed");
} catch (e) {
  if (e.name == "SyntaxError") {
    ok++;
  } else {
    console.log("es3/global.SyntaxError.thrown.js: wrong exception for unclosed string");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3/global.SyntaxError.thrown.js: no exception for unclosed string");
}

caught = 0;
try {
  eval("@#$");
} catch (e) {
  if (e.name == "SyntaxError") {
    ok++;
  } else {
    console.log("es3/global.SyntaxError.thrown.js: wrong exception for invalid token");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3/global.SyntaxError.thrown.js: no exception for invalid token");
}

if (ok == 3) {
  console.log("es3/global.SyntaxError.thrown.js: OK");
} else {
  console.log("es3/global.SyntaxError.thrown.js: failed");
}
