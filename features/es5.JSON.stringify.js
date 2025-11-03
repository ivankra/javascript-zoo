// ES5: 15.12.3 stringify ( value [ , replacer [ , space ] ] )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (typeof JSON.stringify !== 'function') {
  console.log("es5.JSON.stringify.js: FAIL - typeof JSON.stringify !== 'function'");
} else {
  var ok = 1;

  var str = JSON.stringify({ x: 5, y: 6 });
  if (str === '{"x":5,"y":6}') {
    ok++;
  } else {
    console.log("es5.JSON.stringify.js: stringify object failed");
  }

  var str2 = JSON.stringify([1, 2, 3]);
  if (str2 === '[1,2,3]') {
    ok++;
  } else {
    console.log("es5.JSON.stringify.js: stringify array failed");
  }

  if (JSON.stringify(true) === 'true') {
    ok++;
  } else {
    console.log("es5.JSON.stringify.js: stringify true failed");
  }

  if (JSON.stringify(false) === 'false') {
    ok++;
  } else {
    console.log("es5.JSON.stringify.js: stringify false failed");
  }

  if (JSON.stringify(null) === 'null') {
    ok++;
  } else {
    console.log("es5.JSON.stringify.js: stringify null failed");
  }

  if (JSON.stringify(42) === '42') {
    ok++;
  } else {
    console.log("es5.JSON.stringify.js: stringify number failed");
  }

  if (JSON.stringify('hello') === '"hello"') {
    ok++;
  } else {
    console.log("es5.JSON.stringify.js: stringify string failed");
  }

  var stringified = JSON.stringify({ a: 1, b: 2 }, function(key, value) {
    if (typeof value === 'number') {
      return value * 2;
    }
    return value;
  });
  if (stringified === '{"a":2,"b":4}') {
    ok++;
  } else {
    console.log("es5.JSON.stringify.js: replacer function failed");
  }

  var stringified2 = JSON.stringify({ a: 1, b: 2, c: 3 }, ['a', 'c']);
  if (stringified2 === '{"a":1,"c":3}') {
    ok++;
  } else {
    console.log("es5.JSON.stringify.js: replacer array failed");
  }

  var stringified3 = JSON.stringify({ x: 1 }, null, 2);
  if (stringified3.indexOf('\n') !== -1 && stringified3.indexOf('  ') !== -1) {
    ok++;
  } else {
    console.log("es5.JSON.stringify.js: space parameter failed");
  }

  var cyclicThrew = false;
  try {
    var a = [];
    a[0] = a;
    JSON.stringify(a);
  } catch (e) {
    if (e instanceof TypeError) {
      cyclicThrew = true;
    }
  }
  if (cyclicThrew) {
    ok++;
  } else {
    console.log("es5.JSON.stringify.js: cyclic structure does not throw TypeError");
  }

  var obj2 = { a: 1, b: undefined, c: function() {} };
  var str3 = JSON.stringify(obj2);
  if (str3 === '{"a":1}') {
    ok++;
  } else {
    console.log("es5.JSON.stringify.js: failed to drop undefined/function values");
  }

  var arr2 = [1, undefined, function() {}, 4];
  var str4 = JSON.stringify(arr2);
  if (str4 === '[1,null,null,4]') {
    ok++;
  } else {
    console.log("es5.JSON.stringify.js: undefined/function values in array not converted to null");
  }

  var nanInf = JSON.stringify([NaN, Infinity, -Infinity]);
  if (nanInf === '[null,null,null]') {
    ok++;
  } else {
    console.log("es5.JSON.stringify.js: NaN and Infinity not converted null");
  }

  var objWithToJSON = { x: 5, toJSON: function() { return 42; } };
  if (JSON.stringify(objWithToJSON) === '42') {
    ok++;
  } else {
    console.log("es5.JSON.stringify.js: didn't call user-provided toJSON() method");
  }

  var escapes = JSON.stringify('\"\\/\b\f\n\r\t');
  if (escapes === '"\\"\\\\\/\\b\\f\\n\\r\\t"') {
    ok++;
  } else {
    console.log("es5.JSON.stringify.js: escape sequences failed");
  }

  var ctrl = JSON.stringify('\x01');
  if (ctrl === '"\\u0001"') {
    ok++;
  } else {
    console.log("es5.JSON.stringify.js: control char escape failed");
  }

  if (JSON.stringify(undefined) === undefined) {
    ok++;
  } else {
    console.log("es5.JSON.stringify.js: undefined should return undefined");
  }

  if (ok === 19) {
    console.log("es5.JSON.stringify.js: OK");
  } else {
    console.log("es5.JSON.stringify.js: FAIL");
  }
}
