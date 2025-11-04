// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// compat-table: ES6 > built-ins > Proxy (large) > "getOwnPropertyDescriptor" handler invariants
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = false;
  new Proxy({},{});
  // A property cannot be reported as non-existent, if it exists as a non-configurable
  // own property of the target object.
  var proxied = {};
  var proxy = new Proxy(proxied, {
    getOwnPropertyDescriptor: function () {
      passed = true;
      return undefined;
    }
  });
  Object.defineProperty(proxied, "foo", { value: 2, writable: true, enumerable: true });
  try {
    Object.getOwnPropertyDescriptor(proxy, "foo");
    return false;
  } catch(e) {}
  // A property cannot be reported as non-existent, if it exists as an own property
  // of the target object and the target object is not extensible.
  proxied.bar = 3;
  Object.preventExtensions(proxied);
  try {
    Object.getOwnPropertyDescriptor(proxy, "bar");
    return false;
  } catch(e) {}
  // A property cannot be reported as existent, if it does not exists as an own property
  // of the target object and the target object is not extensible.
  try {
    Object.getOwnPropertyDescriptor(new Proxy(proxied, {
      getOwnPropertyDescriptor: function() {
        return { value: 2, configurable: true, writable: true, enumerable: true };
      }}), "baz");
    return false;
  } catch(e) {}
  // A property cannot be reported as non-configurable, if it does not exists as an own
  // property of the target object or if it exists as a configurable own property of
  // the target object.
  try {
    Object.getOwnPropertyDescriptor(new Proxy({}, {
      getOwnPropertyDescriptor: function() {
        return { value: 2, configurable: false, writable: true, enumerable: true };
      }}), "baz");
    return false;
  } catch(e) {}
  try {
    Object.getOwnPropertyDescriptor(new Proxy({baz:1}, {
      getOwnPropertyDescriptor: function() {
        return { value: 1, configurable: false, writable: true, enumerable: true };
      }}), "baz");
    return false;
  } catch(e) {}
  return passed;
}

try {
  if (testCode()) {
    console.log("es6.Proxy.handler.getOwnPropertyDescriptor.invariants.js: OK");
  } else {
    console.log("es6.Proxy.handler.getOwnPropertyDescriptor.invariants.js: FAIL");
  }
} catch (e) {
  console.log("es6.Proxy.handler.getOwnPropertyDescriptor.invariants.js: FAIL: " + e);
}