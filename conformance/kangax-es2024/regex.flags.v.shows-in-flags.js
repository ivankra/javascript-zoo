// compat-table: ES2016+ > 2024 features > RegExp `v` flag (small) > shows up in flags
// spec: https://github.com/tc39/proposal-regexp-v-flag
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var flags = [];
  var p = new Proxy({}, { get: function (o, k) { flags.push(k); return o[k]; }});
  Object.getOwnPropertyDescriptor(RegExp.prototype, 'flags').get.call(p);
  return flags.indexOf("unicodeSets") !== -1;
}

try {
  if (testCode()) {
    console.log("kangax-es2024/regex.flags.v.shows-in-flags.js: OK");
  } else {
    console.log("kangax-es2024/regex.flags.v.shows-in-flags.js: failed");
  }
} catch (e) {
  console.log("kangax-es2024/regex.flags.v.shows-in-flags.js: exception: " + e);
}
