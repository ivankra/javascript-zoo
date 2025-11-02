// ES3: 12.14 The try statement
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var finally1 = 0;
try {
  finally1 = 1;
} finally {
  finally1 = finally1 + 10;
}
if (finally1 == 11) {
  ok++;
} else {
  console.log("es3.try-catch-finally.js: try/finally failed");
}

var finally2 = 0;
try {
  throw 5;
} catch (e) {
  finally2 = e;
} finally {
  finally2 = finally2 + 100;
}
if (finally2 == 105) {
  ok++;
} else {
  console.log("es3.try-catch-finally.js: try/catch/finally failed");
}

var finally3 = 0;
try {
  try {
    finally3 = 1;
    throw 7;
  } finally {
    finally3 = finally3 + 20;
  }
} catch (e) {
  finally3 = finally3;
}
if (finally3 == 21) {
  ok++;
} else {
  console.log("es3.try-catch-finally.js: finally executes on throw failed");
}

var finally4 = 0;
try {
  try {
    finally4 = 1;
  } finally {
    finally4 = finally4 + 5;
  }
} catch (e) {
  finally4 = 999;
}
if (finally4 == 6) {
  ok++;
} else {
  console.log("es3.try-catch-finally.js: nested try/finally failed");
}

if (ok == 4) {
  console.log("es3.try-catch-finally.js: OK");
} else {
  console.log("es3.try-catch-finally.js: FAIL");
}
