// compat-table: ES Intl > Intl.Collator > rejects invalid language tags
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator
// spec: https://github.com/tc39/ecma402/pull/289
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  if (typeof Intl.Collator !== 'function') return false;
  try {
    // Taken from https://github.com/tc39/test262/blob/83b07ff15eadb141c3d6f4d236a8733b720041d2/test/intl402/6.2.2_a.js
    var invalidLanguageTags = [
      "i-klingon", // grandfathered tag
      "x-en-US-12345", // anything goes in private use tags
      "x-12345-12345-en-US",
      "x-en-US-12345-12345",
      "x-en-u-foo",
      "x-en-u-foo-u-bar"
    ];
    for (var i in invalidLanguageTags) {
      Intl.Collator(invalidLanguageTags[i]);
    }
    return false;
  } catch(e) {
    return true;
  }
}

try {
  if (testCode()) {
    console.log("kangax-intl/Intl.Collator.rejects-invalid-tags.js: OK");
  } else {
    console.log("kangax-intl/Intl.Collator.rejects-invalid-tags.js: failed");
  }
} catch (e) {
  console.log("kangax-intl/Intl.Collator.rejects-invalid-tags.js: exception: " + e);
}
