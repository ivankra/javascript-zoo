// ES3: 15.1.1.3 undefined
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

// ES3 adds an explicit global binding for undefined value.
// ES1 idiom: void(0)

if (typeof undefined == "undefined") {
  console.log("es3.global.undefined.js: OK");
} else {
  console.log("es3.global.undefined.js: FAIL");
}
