// ES5: 15.12.3 stringify ( value [ , replacer [ , space ] ] )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (typeof JSON.stringify !== 'function') {
  console.log("es5/JSON.stringify.replacer.js: failed: typeof JSON.stringify !== 'function'");
} else {
  var ok = 1;

  var stringified = JSON.stringify({ a: 1, b: 2 }, function(key, value) {
    if (typeof value === 'number') {
      return value * 2;
    }
    return value;
  });
  if (stringified === '{"a":2,"b":4}') {
    ok++;
  } else {
    console.log("es5/JSON.stringify.replacer.js: replacer function failed");
  }

  var stringified2 = JSON.stringify({ a: 1, b: 2, c: 3 }, ['a', 'c']);
  if (stringified2 === '{"a":1,"c":3}') {
    ok++;
  } else {
    console.log("es5/JSON.stringify.replacer.js: replacer array failed");
  }

  if (ok === 3) {
    console.log("es5/JSON.stringify.replacer.js: OK");
  } else {
    console.log("es5/JSON.stringify.replacer.js: failed");
  }
}
