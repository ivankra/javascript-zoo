// ES3: 15.1.3.4 encodeURIComponent (uriComponent)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var encoded1 = encodeURIComponent("hello world");
if (encoded1 == "hello%20world") {
  ok++;
} else {
  console.log("es3/global.encodeURIComponent.js: encode space failed");
}

var encoded2 = encodeURIComponent("test\u00E9");
if (encoded2 == "test%C3%A9") {
  ok++;
} else {
  console.log("es3/global.encodeURIComponent.js: encode UTF-8 failed");
}

var encoded3 = encodeURIComponent("foo#bar");
if (encoded3 == "foo%23bar") {
  ok++;
} else {
  console.log("es3/global.encodeURIComponent.js: encode # failed");
}

var encoded4 = encodeURIComponent("a=b&c=d");
if (encoded4 == "a%3Db%26c%3Dd") {
  ok++;
} else {
  console.log("es3/global.encodeURIComponent.js: encode reserved chars failed");
}

var encoded5 = encodeURIComponent("plain");
if (encoded5 == "plain") {
  ok++;
} else {
  console.log("es3/global.encodeURIComponent.js: encode plain string failed");
}

if (ok == 5) {
  console.log("es3/global.encodeURIComponent.js: OK");
} else {
  console.log("es3/global.encodeURIComponent.js: failed");
}
