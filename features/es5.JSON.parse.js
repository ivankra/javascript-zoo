// ES5: 15.12.2 parse ( text [ , reviver ] )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (typeof JSON.parse !== 'function') {
  console.log("es5.JSON.parse.js: FAIL - typeof JSON.parse !== 'function'");
} else {
  var ok = 1;

  var obj = JSON.parse('{"a":1,"b":true,"c":null}');
  if (obj.a === 1 && obj.b === true && obj.c === null) {
    ok++;
  } else {
    console.log("es5.JSON.parse.js: parse object failed");
  }

  var arr = JSON.parse('[1,2,3]');
  if (arr.length === 3 && arr[0] === 1 && arr[2] === 3) {
    ok++;
  } else {
    console.log("es5.JSON.parse.js: parse array failed");
  }

  if (JSON.parse('true') === true) {
    ok++;
  } else {
    console.log("es5.JSON.parse.js: parse true failed");
  }

  if (JSON.parse('false') === false) {
    ok++;
  } else {
    console.log("es5.JSON.parse.js: parse false failed");
  }

  if (JSON.parse('null') === null) {
    ok++;
  } else {
    console.log("es5.JSON.parse.js: parse null failed");
  }

  if (JSON.parse('42') === 42) {
    ok++;
  } else {
    console.log("es5.JSON.parse.js: parse number failed");
  }

  if (JSON.parse('"hello"') === 'hello') {
    ok++;
  } else {
    console.log("es5.JSON.parse.js: parse string failed");
  }

  var parsed = JSON.parse('{"a":10}', function(key, value) {
    if (typeof value === 'number') {
      return value * 2;
    }
    return value;
  });
  if (parsed.a === 20) {
    ok++;
  } else {
    console.log("es5.JSON.parse.js: failed to apply reviver function");
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
    console.log("es5.JSON.parse.js: failed to delete property for which reviver returned undefined");
  }

  // "In the case where there are duplicate name Strings within an object,
  // lexically preceding values for the same key shall be overwritten."
  try {
    var dup = JSON.parse('{"a":1,"a":2}');
    if (dup.a === 2) {
      ok++;
    } else {
      console.log("es5.JSON.parse.js: duplicate keys does not use last value");
    }
  } catch (e) {
    console.log("es5.JSON.parse.js: threw exception on '{\"a\":1,\"a\":2}'");
  }

  var threw1 = false;
  try {
    JSON.parse('invalid');
  } catch (e) {
    if (e instanceof SyntaxError) {
      threw1 = true;
    }
  }
  if (threw1) {
    ok++;
  } else {
    console.log("es5.JSON.parse.js: invalid JSON does not throw SyntaxError");
  }

  // "It is not permitted for a conforming implementation of JSON.parse
  // to extend the JSON grammars."
  var threw2 = false;
  try {
    JSON.parse('{"a":1,}');
  } catch (e) {
    if (e instanceof SyntaxError) {
      threw2 = true;
    }
  }
  if (threw2) {
    ok++;
  } else {
    console.log("es5.JSON.parse.js: trailing comma does not throw SyntaxError");
  }

  var ws = JSON.parse('  \t\r\n{"x":1}');
  if (ws.x === 1) {
    ok++;
  } else {
    console.log("es5.JSON.parse.js: whitespace failed");
  }

  var esc = JSON.parse('{"a":"\\"\\\\\/\\b\\f\\n\\r\\t"}');
  if (esc.a === '"\\/\b\f\n\r\t') {
    ok++;
  } else {
    console.log("es5.JSON.parse.js: escape sequences failed");
  }

  var uni = JSON.parse('{"a":"\\u0041"}');
  if (uni.a === 'A') {
    ok++;
  } else {
    console.log("es5.JSON.parse.js: unicode escape failed");
  }

  var neg = JSON.parse('-123');
  if (neg === -123) {
    ok++;
  } else {
    console.log("es5.JSON.parse.js: negative number failed");
  }

  var frac = JSON.parse('3.14');
  if (frac === 3.14) {
    ok++;
  } else {
    console.log("es5.JSON.parse.js: fraction failed");
  }

  var exp = JSON.parse('1e3');
  if (exp === 1000) {
    ok++;
  } else {
    console.log("es5.JSON.parse.js: exponent failed");
  }

  if (ok === 19) {
    console.log("es5.JSON.parse.js: OK");
  } else {
    console.log("es5.JSON.parse.js: FAIL");
  }
}
