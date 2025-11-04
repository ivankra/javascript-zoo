// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols
// compat-table: ES6 > built-ins > well-known symbols (medium) > Symbol.toStringTag, new built-ins
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = true;
  var s = Symbol.toStringTag;
  [
    [String, "String Iterator"],
    [Array, "Array Iterator"],
    [Map, "Map Iterator"],
    [Set, "Set Iterator"]
  ].forEach(function(pair){
    var iterProto = Object.getPrototypeOf(new pair[0]()[Symbol.iterator]());
    passed = passed
      && iterProto.hasOwnProperty(s)
      && iterProto[s] === pair[1];
  });
  passed = passed
    && Object.getPrototypeOf(function*(){})[s] === "GeneratorFunction"
    && Object.getPrototypeOf(function*(){}())[s] === "Generator"
    && Map.prototype[s] === "Map"
    && Set.prototype[s] === "Set"
    && ArrayBuffer.prototype[s] === "ArrayBuffer"
    && DataView.prototype[s] === "DataView"
    && Promise.prototype[s] === "Promise"
    && Symbol.prototype[s] === "Symbol"
    && typeof Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(Int8Array).prototype, Symbol.toStringTag).get === "function";
    return passed;
}

try {
  if (testCode()) {
    console.log("es6.well-known.toStringTag.new-builtins.js: OK");
  } else {
    console.log("es6.well-known.toStringTag.new-builtins.js: FAIL");
  }
} catch (e) {
  console.log("es6.well-known.toStringTag.new-builtins.js: FAIL: " + e);
}