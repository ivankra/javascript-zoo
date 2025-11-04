// compat-table: ES5 > Array methods (large) > Array.prototype.sort: compareFn must be function or undefined
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  try {
    [1,2].sort(null);
    return false;
  } catch (enull) {}
  try {
    [1,2].sort(true);
    return false;
  } catch (etrue) {}
  try {
    [1,2].sort({});
    return false;
  } catch (eobj) {}
  try {
    [1,2].sort([]);
    return false;
  } catch (earr) {}
  try {
    [1,2].sort(/a/g);
    return false;
  } catch (eregex) {}
  return true;
}

try {
  if (testCode()) {
    console.log("es5.Array.prototype.sort.compareFn-type.js: OK");
  } else {
    console.log("es5.Array.prototype.sort.compareFn-type.js: FAIL");
  }
} catch (e) {
  console.log("es5.Array.prototype.sort.compareFn-type.js: FAIL: " + e);
}