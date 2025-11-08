// ES5: 15.12.3 stringify ( value [ , replacer [ , space ] ] )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (typeof JSON.stringify !== 'function') {
  console.log("es5/JSON.stringify.space.js: failed: typeof JSON.stringify !== 'function'");
} else {
  var ok = 1;

  var stringified = JSON.stringify({ x: 1 }, null, 2);
  if (stringified.indexOf('\n') !== -1 && stringified.indexOf('  ') !== -1) {
    ok++;
  } else {
    console.log("es5/JSON.stringify.space.js: space parameter failed");
  }

  if (ok === 2) {
    console.log("es5/JSON.stringify.space.js: OK");
  } else {
    console.log("es5/JSON.stringify.space.js: failed");
  }
}
