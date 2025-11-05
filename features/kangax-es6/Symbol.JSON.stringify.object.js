// compat-table: ES6 > built-ins > Symbol (large) > JSON.stringify ignores symbol objects
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-symbol-constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var testSymbolObject = function (sym) {
    var object = { foo: sym };
    try {
      // some browsers throw a TypeError when setting symbol object keys.
      // this isn't part of this test, so, ignore it if so.
      object[sym] = 1;
    } catch (e) {} // some browsers throw a TypeError when setting symbol object keys.
    var array = [sym];
    return JSON.stringify(object) === '{"foo":{}}' && JSON.stringify(array) === '[{}]' && JSON.stringify(sym) === '{}';
  };
  var objSym = Object(Symbol());
  var symNoToJSON = Object(Symbol());
  Object.defineProperty(symNoToJSON, 'toJSON', { enumerable: false, value: null }); // ensure it overrides the prototype, but is not callable
  return testSymbolObject(objSym) && testSymbolObject(symNoToJSON);
}

try {
  if (testCode()) {
    console.log("kangax-es6/Symbol.JSON.stringify.object.js: OK");
  } else {
    console.log("kangax-es6/Symbol.JSON.stringify.object.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Symbol.JSON.stringify.object.js: exception: " + e);
}
