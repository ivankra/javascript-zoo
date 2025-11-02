// ES3: 15.10.7.5 lastIndex
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var re = new RegExp("a", "g");

if (re.lastIndex == 0) {
  ok++;
} else {
  console.log("es3.RegExp.lastIndex.js: initial value failed");
}

re.exec("bbaabb");
if (re.lastIndex == 3) {
  ok++;
} else {
  console.log("es3.RegExp.lastIndex.js: after first match failed");
}

re.exec("bbaabb");
if (re.lastIndex == 4) {
  ok++;
} else {
  console.log("es3.RegExp.lastIndex.js: after second match failed");
}

if (ok == 3) {
  console.log("es3.RegExp.lastIndex.js: OK");
} else {
  console.log("es3.RegExp.lastIndex.js: FAIL");
}
