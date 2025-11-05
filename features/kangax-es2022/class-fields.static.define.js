// compat-table: ES2016+ > 2022 features > static class fields (medium) > static class fields use [[Define]]
// spec: https://github.com/tc39/proposal-static-class-features/
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return (class X { static name = "name"; }).name === 'name';
}

try {
  if (testCode()) {
    console.log("kangax-es2022/class-fields.static.define.js: OK");
  } else {
    console.log("kangax-es2022/class-fields.static.define.js: failed");
  }
} catch (e) {
  console.log("kangax-es2022/class-fields.static.define.js: exception: " + e);
}
