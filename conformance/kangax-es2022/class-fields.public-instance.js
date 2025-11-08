// compat-table: ES2016+ > 2022 features > instance class fields (medium) > public instance class fields
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_elements#Public_instance_fields
// spec: https://github.com/tc39/proposal-class-fields
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C {
    x = 'x';
  }
  return new C().x === 'x';
}

try {
  if (testCode()) {
    console.log("kangax-es2022/class-fields.public-instance.js: OK");
  } else {
    console.log("kangax-es2022/class-fields.public-instance.js: failed");
  }
} catch (e) {
  console.log("kangax-es2022/class-fields.public-instance.js: exception: " + e);
}
