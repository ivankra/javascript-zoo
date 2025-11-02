// ES3: 15.11 Error Objects
// ES3: 15.11.1.1 Error (message)
// ES3: 15.11.2.1 new Error (message)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var e1 = new Error("test message");
if (typeof e1 == "object") {
  ok++;
} else {
  console.log("es3.Error.js: new Error failed");
}

if (e1.message == "test message") {
  ok++;
} else {
  console.log("es3.Error.js: message property failed");
}

var e2 = Error("another message");
if (typeof e2 == "object") {
  ok++;
} else {
  console.log("es3.Error.js: Error as function failed");
}

if (e2.message == "another message") {
  ok++;
} else {
  console.log("es3.Error.js: function call message failed");
}

var e3 = new Error();
if (typeof e3 == "object") {
  ok++;
} else {
  console.log("es3.Error.js: Error without message failed");
}

if (ok == 5) {
  console.log("es3.Error.js: OK");
} else {
  console.log("es3.Error.js: FAIL");
}
