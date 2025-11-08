// compat-table: ES Intl > NumberFormat > accepts valid language tags
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
// spec: http://www.ecma-international.org/ecma-402/1.0/#sec-11
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  try {
    // Taken from https://github.com/tc39/test262/blob/83b07ff15eadb141c3d6f4d236a8733b720041d2/test/intl402/6.2.2_a.js
    var validLanguageTags = [
      "de", // ISO 639 language code
      "de-DE", // + ISO 3166-1 country code
      "DE-de", // tags are case-insensitive
      "cmn", // ISO 639 language code
      "cmn-Hans", // + script code
      "CMN-hANS", // tags are case-insensitive
      "cmn-hans-cn", // + ISO 3166-1 country code
      "es-419", // + UN M.49 region code
      "es-419-u-nu-latn-cu-bob", // + Unicode locale extension sequence
      "cmn-hans-cn-t-ca-u-ca-x-t-u", // singleton subtags can also be used as private use subtags
      "de-gregory-u-ca-gregory", // variant and extension subtags may be the same
      "aa-a-foo-x-a-foo-bar", // variant subtags can also be used as private use subtags
    ];
    for (var i in validLanguageTags) {
      Intl.NumberFormat(validLanguageTags[i]);
    }
    return true;
  } catch(e) {
    return false;
  }
}

try {
  if (testCode()) {
    console.log("kangax-intl/Intl.NumberFormat.valid-tags.js: OK");
  } else {
    console.log("kangax-intl/Intl.NumberFormat.valid-tags.js: failed");
  }
} catch (e) {
  console.log("kangax-intl/Intl.NumberFormat.valid-tags.js: exception: " + e);
}
