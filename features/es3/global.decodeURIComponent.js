// ES3: 15.1.3.2 decodeURIComponent (encodedURIComponent)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var decoded1 = decodeURIComponent("hello%20world");
if (decoded1 == "hello world") {
  ok++;
} else {
  console.log("es3/global.decodeURIComponent.js: decode space failed");
}

var decoded2 = decodeURIComponent("test%C3%A9");
if (decoded2 == "test\u00E9") {
  ok++;
} else {
  console.log("es3/global.decodeURIComponent.js: decode UTF-8 failed");
}

var decoded3 = decodeURIComponent("foo%23bar");
if (decoded3 == "foo#bar") {
  ok++;
} else {
  console.log("es3/global.decodeURIComponent.js: decode # failed");
}

var decoded4 = decodeURIComponent("a%3Db%26c%3Dd");
if (decoded4 == "a=b&c=d") {
  ok++;
} else {
  console.log("es3/global.decodeURIComponent.js: decode reserved chars failed");
}

var decoded5 = decodeURIComponent("plain");
if (decoded5 == "plain") {
  ok++;
} else {
  console.log("es3/global.decodeURIComponent.js: decode plain string failed");
}

if (ok == 5) {
  console.log("es3/global.decodeURIComponent.js: OK");
} else {
  console.log("es3/global.decodeURIComponent.js: failed");
}
