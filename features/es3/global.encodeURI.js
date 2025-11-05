// ES3: 15.1.3.3 encodeURI (uri)
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var encoded1 = encodeURI("https://example.com/path?query=value");
if (encoded1 == "https://example.com/path?query=value") {
  ok++;
} else {
  console.log("es3/global.encodeURI.js: encode plain URI failed");
}

var encoded2 = encodeURI("hello world");
if (encoded2 == "hello%20world") {
  ok++;
} else {
  console.log("es3/global.encodeURI.js: encode space failed");
}

var encoded3 = encodeURI("test\u00E9");
if (encoded3 == "test%C3%A9") {
  ok++;
} else {
  console.log("es3/global.encodeURI.js: encode UTF-8 failed");
}

var encoded4 = encodeURI("http://example.com#hash");
if (encoded4 == "http://example.com#hash") {
  ok++;
} else {
  console.log("es3/global.encodeURI.js: # not encoded failed");
}

var encoded5 = encodeURI("http://example.com:8080/path;param?query=1&other=2");
if (encoded5 == "http://example.com:8080/path;param?query=1&other=2") {
  ok++;
} else {
  console.log("es3/global.encodeURI.js: reserved URI characters preserved failed");
}

if (ok == 5) {
  console.log("es3/global.encodeURI.js: OK");
} else {
  console.log("es3/global.encodeURI.js: failed");
}
