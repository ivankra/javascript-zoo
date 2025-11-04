// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols
// compat-table: ES6 > built-ins > well-known symbols (medium) > Symbol.species, Promise.prototype.then
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var promise      = new Promise(function(resolve){ resolve(42); });
  var FakePromise1 = promise.constructor = function(exec){ exec(function(){}, function(){}); };
  var FakePromise2 = function(exec){ exec(function(){}, function(){}); };
  Object.defineProperty(FakePromise1, Symbol.species, {value: FakePromise2});
  return promise.then(function(){}) instanceof FakePromise2;
}

try {
  if (testCode()) {
    console.log("es6.well-known.species.Promise.then.js: OK");
  } else {
    console.log("es6.well-known.species.Promise.then.js: FAIL");
  }
} catch (e) {
  console.log("es6.well-known.species.Promise.then.js: FAIL: " + e);
}