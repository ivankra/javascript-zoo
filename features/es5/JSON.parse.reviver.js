// ES5: 15.12.2 parse ( text [ , reviver ] )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (typeof JSON.parse !== 'function') {
  console.log("es5/JSON.parse.reviver.js: failed: typeof JSON.parse !== 'function'");
} else {
  var ok = 1;

  var parsed = JSON.parse('{"a":10}', function(key, value) {
    if (typeof value === 'number') {
      return value * 2;
    }
    return value;
  });
  if (parsed.a === 20) {
    ok++;
  } else {
    console.log("es5/JSON.parse.reviver.js: failed to apply reviver function");
  }

  var parsed2 = JSON.parse('{"a":1,"b":2}', function(key, value) {
    if (key === 'b') {
      return undefined;
    }
    return value;
  });
  if (parsed2.a === 1 && !('b' in parsed2)) {
    ok++;
  } else {
    console.log("es5/JSON.parse.reviver.js: failed to delete property for which reviver returned undefined");
  }

  if (ok === 3) {
    console.log("es5/JSON.parse.reviver.js: OK");
  } else {
    console.log("es5/JSON.parse.reviver.js: failed");
  }
}
