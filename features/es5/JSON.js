// ES5: 15.12 The JSON Object
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
// compat-table: ES5 > JSON (medium)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (typeof JSON === 'object') {
  console.log("es5/JSON.js: OK");
} else {
  console.log("es5/JSON.js: failed: typeof JSON !== 'object'");
}
