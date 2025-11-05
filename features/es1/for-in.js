// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var obj = new Object();
obj.abc = 1;
obj.def = 2;

var cat = "";
for (var key in obj) {
  cat += key;
}

if (cat == "abcdef" || cat == "defabc") {
  console.log("es1/for-in.js: OK");
} else {
  console.log("es1/for-in.js: failed");
}
