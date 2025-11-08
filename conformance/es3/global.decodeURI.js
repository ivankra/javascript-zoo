// ES3: 15.1.3.1 decodeURI (encodedURI)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var decoded1 = decodeURI("https://example.com/path?query=value");
if (decoded1 == "https://example.com/path?query=value") {
  ok++;
} else {
  console.log("es3/global.decodeURI.js: decode plain URI failed");
}

var decoded2 = decodeURI("hello%20world");
if (decoded2 == "hello world") {
  ok++;
} else {
  console.log("es3/global.decodeURI.js: decode space failed");
}

var decoded3 = decodeURI("test%C3%A9");
if (decoded3 == "test\u00E9") {
  ok++;
} else {
  console.log("es3/global.decodeURI.js: decode UTF-8 failed");
}

var decoded4 = decodeURI("http://example.com%23hash");
if (decoded4 == "http://example.com%23hash") {
  ok++;
} else {
  console.log("es3/global.decodeURI.js: # not decoded failed");
}

var decoded5 = decodeURI("http://example.com:8080/path;param?query=1&other=2");
if (decoded5 == "http://example.com:8080/path;param?query=1&other=2") {
  ok++;
} else {
  console.log("es3/global.decodeURI.js: reserved URI characters preserved failed");
}

if (ok == 5) {
  console.log("es3/global.decodeURI.js: OK");
} else {
  console.log("es3/global.decodeURI.js: failed");
}
