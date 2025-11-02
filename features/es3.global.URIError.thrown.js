// ES3: 15.1.3.1 decodeURI (encodedURI)
// ES3: 15.1.3.2 decodeURIComponent (encodedURIComponent)
// ES3: 15.1.3.3 encodeURI (uri)
// ES3: 15.1.3.4 encodeURIComponent (uriComponent)
// ES3: 15.11.6.6 URIError
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var caught = 0;
try {
  decodeURI("%");
} catch (e) {
  if (e.name == "URIError") {
    ok++;
  } else {
    console.log("es3.global.URIError.thrown.js: wrong exception for decodeURI incomplete escape");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.URIError.thrown.js: no exception for decodeURI incomplete escape");
}

caught = 0;
try {
  decodeURI("%GG");
} catch (e) {
  if (e.name == "URIError") {
    ok++;
  } else {
    console.log("es3.global.URIError.thrown.js: wrong exception for decodeURI invalid hex");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.URIError.thrown.js: no exception for decodeURI invalid hex");
}

caught = 0;
try {
  decodeURI("%C0");
} catch (e) {
  if (e.name == "URIError") {
    ok++;
  } else {
    console.log("es3.global.URIError.thrown.js: wrong exception for decodeURI invalid UTF-8");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.URIError.thrown.js: no exception for decodeURI invalid UTF-8");
}

caught = 0;
try {
  decodeURIComponent("%");
} catch (e) {
  if (e.name == "URIError") {
    ok++;
  } else {
    console.log("es3.global.URIError.thrown.js: wrong exception for decodeURIComponent incomplete escape");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.URIError.thrown.js: no exception for decodeURIComponent incomplete escape");
}

caught = 0;
try {
  decodeURIComponent("%ZZ");
} catch (e) {
  if (e.name == "URIError") {
    ok++;
  } else {
    console.log("es3.global.URIError.thrown.js: wrong exception for decodeURIComponent invalid hex");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.URIError.thrown.js: no exception for decodeURIComponent invalid hex");
}

caught = 0;
try {
  encodeURI("\uDC00");
} catch (e) {
  if (e.name == "URIError") {
    ok++;
  } else {
    console.log("es3.global.URIError.thrown.js: wrong exception for encodeURI lone low surrogate");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.URIError.thrown.js: no exception for encodeURI lone low surrogate");
}

caught = 0;
try {
  encodeURI("\uD800");
} catch (e) {
  if (e.name == "URIError") {
    ok++;
  } else {
    console.log("es3.global.URIError.thrown.js: wrong exception for encodeURI lone high surrogate");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.URIError.thrown.js: no exception for encodeURI lone high surrogate");
}

caught = 0;
try {
  encodeURIComponent("\uDFFF");
} catch (e) {
  if (e.name == "URIError") {
    ok++;
  } else {
    console.log("es3.global.URIError.thrown.js: wrong exception for encodeURIComponent lone low surrogate");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.URIError.thrown.js: no exception for encodeURIComponent lone low surrogate");
}

caught = 0;
try {
  encodeURIComponent("\uDBFF");
} catch (e) {
  if (e.name == "URIError") {
    ok++;
  } else {
    console.log("es3.global.URIError.thrown.js: wrong exception for encodeURIComponent lone high surrogate");
  }
  caught++;
}
if (caught == 0) {
  console.log("es3.global.URIError.thrown.js: no exception for encodeURIComponent lone high surrogate");
}

if (ok == 9) {
  console.log("es3.global.URIError.thrown.js: OK");
} else {
  console.log("es3.global.URIError.thrown.js: FAIL");
}
