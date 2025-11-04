// ES6: http://www.ecma-international.org/ecma-262/7.0/index.html#sec-proxy-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/enumerate
// compat-table: ES2016+ > 2016 misc > Proxy, "enumerate" handler removed (tiny)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = true;
  var proxy = new Proxy({}, {
    enumerate: function () {
      passed = false;
    }
  });
  for (var key in proxy); // Should not throw, nor execute the 'enumerate' method.
  return passed;
}

try {
  if (testCode()) {
    console.log("es2016.misc.Proxy-enumerate-removed.js: OK");
  } else {
    console.log("es2016.misc.Proxy-enumerate-removed.js: FAIL");
  }
} catch (e) {
  console.log("es2016.misc.Proxy-enumerate-removed.js: FAIL: " + e);
}