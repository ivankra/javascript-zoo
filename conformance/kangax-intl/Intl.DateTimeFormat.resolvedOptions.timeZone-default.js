// compat-table: ES Intl > DateTimeFormat > resolvedOptions().timeZone defaults to the host environment
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
// spec: http://www.ecma-international.org/ecma-402/1.0/#sec-12
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return tz !== void undefined && tz.length > 0;
}

try {
  if (testCode()) {
    console.log("kangax-intl/Intl.DateTimeFormat.resolvedOptions.timeZone-default.js: OK");
  } else {
    console.log("kangax-intl/Intl.DateTimeFormat.resolvedOptions.timeZone-default.js: failed");
  }
} catch (e) {
  console.log("kangax-intl/Intl.DateTimeFormat.resolvedOptions.timeZone-default.js: exception: " + e);
}
