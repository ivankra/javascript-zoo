// ES6: http://www.ecma-international.org/ecma-402/1.0/#sec-12
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
// compat-table: ES Intl > DateTimeFormat > accepts IANA timezone names
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  try {
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'Australia/Sydney',
      timeZoneName: 'long'
    }).format();
    return true;
  } catch (e) {
    return false;
  }
}

try {
  if (testCode()) {
    console.log("esintl.Intl.DateTimeFormat.iana-timezones.js: OK");
  } else {
    console.log("esintl.Intl.DateTimeFormat.iana-timezones.js: FAIL");
  }
} catch (e) {
  console.log("esintl.Intl.DateTimeFormat.iana-timezones.js: FAIL: " + e);
}