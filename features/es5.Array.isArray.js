// ES5: 15.4.3.2 Array.isArray ( arg )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
// compat-table: ES5 > Array methods (large) > Array.isArray
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Array.isArray === 'function') {
  ok++;
} else {
  console.log("es5.Array.isArray.js: Array.isArray not a function");
}

if (Array.isArray([]) === true) {
  ok++;
} else {
  console.log("es5.Array.isArray.js: empty array failed");
}

if (Array.isArray([1, 2, 3]) === true) {
  ok++;
} else {
  console.log("es5.Array.isArray.js: array with elements failed");
}

if (Array.isArray({}) === false) {
  ok++;
} else {
  console.log("es5.Array.isArray.js: object not array failed");
}

if (Array.isArray(null) === false) {
  ok++;
} else {
  console.log("es5.Array.isArray.js: null not array failed");
}

if (Array.isArray(undefined) === false) {
  ok++;
} else {
  console.log("es5.Array.isArray.js: undefined not array failed");
}

if (ok === 6) {
  console.log("es5.Array.isArray.js: OK");
} else {
  console.log("es5.Array.isArray.js: FAIL");
}
