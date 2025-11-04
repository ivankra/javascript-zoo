// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
// compat-table: ES6 > built-ins > typed arrays (large) > correct prototype chains
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (typeof global === "undefined") global = this;

function testCode() {
  var constructors = [
    'Int8Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Int16Array',
    'Uint16Array',
    'Int32Array',
    'Uint32Array',
    'Float32Array',
    'Float64Array'
  ];
  var constructor = Object.getPrototypeOf(Int8Array);
  var prototype = Object.getPrototypeOf(Int8Array.prototype);
  if(constructor === Function.prototype || prototype === Object.prototype)return false;
  for(var i = 0; i < constructors.length; i+=1) {
    if (!(constructors[i] in global
        && Object.getPrototypeOf(global[constructors[i]]) === constructor
        && Object.getPrototypeOf(global[constructors[i]].prototype) === prototype)) {
      return false;
    }
    const keys = Object.getOwnPropertyNames(global[constructors[i]].prototype).sort() + '';
    if (keys !== "BYTES_PER_ELEMENT,constructor" &&
        /* arraybuffer-base64 proposal */
        keys !== "BYTES_PER_ELEMENT,constructor,setFromBase64,setFromHex,toBase64,toHex") {
      console.log(keys);
      return false;
    }
  }
  return true;
}

try {
  if (testCode()) {
    console.log("es6.typed-arrays.correct-prototype-chains.edited.js: OK");
  } else {
    console.log("es6.typed-arrays.correct-prototype-chains.edited.js: FAIL");
  }
} catch (e) {
  console.log("es6.typed-arrays.correct-prototype-chains.edited.js: FAIL: " + e);
}
