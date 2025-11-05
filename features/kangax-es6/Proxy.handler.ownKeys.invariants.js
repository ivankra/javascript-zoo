// compat-table: ES6 > built-ins > Proxy (large) > "ownKeys" handler invariant
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = false;
  new Proxy({},{});
  // The Type of each result List element is either String or Symbol.
  try {
    Object.keys(new Proxy({}, {
      ownKeys: function () {
        passed = true;
        return [2];
      }}));
    return false;
  } catch(e) {}
  // The result List must contain the keys of all non-configurable own properties of the target object.
  var proxied = {};
  Object.defineProperty(proxied, "foo", { value: 2, writable: true, enumerable: true });
  try {
    Object.keys(new Proxy(proxied, {
      ownKeys: function () {
        return [];
      }}));
    return false;
  } catch(e) {}
  // If the target object is not extensible, then the result List must contain all the keys
  // of the own properties of the target object and no other values.
  try {
    Object.keys(new Proxy(Object.preventExtensions({b:1}), {
      ownKeys: function () {
        return ['a'];
      }}));
    return false;
  } catch(e) {}
  return passed;
}

try {
  if (testCode()) {
    console.log("kangax-es6/Proxy.handler.ownKeys.invariants.js: OK");
  } else {
    console.log("kangax-es6/Proxy.handler.ownKeys.invariants.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Proxy.handler.ownKeys.invariants.js: exception: " + e);
}
