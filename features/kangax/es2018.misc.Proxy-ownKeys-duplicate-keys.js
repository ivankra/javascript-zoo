// ES6: https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots-ownpropertykeys
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/ownKeys
// compat-table: ES2016+ > 2018 misc > Proxy "ownKeys" handler, duplicate keys for non-extensible targets (tiny)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var p = new Proxy({}, {
    ownKeys() {
      return ["a", "a"];
    }
  });
  try {
    Object.keys(p);
  } catch (e) {
    return e instanceof TypeError;
  }
  return false;
}

try {
  if (testCode()) {
    console.log("es2018.misc.Proxy-ownKeys-duplicate-keys.js: OK");
  } else {
    console.log("es2018.misc.Proxy-ownKeys-duplicate-keys.js: FAIL");
  }
} catch (e) {
  console.log("es2018.misc.Proxy-ownKeys-duplicate-keys.js: FAIL: " + e);
}