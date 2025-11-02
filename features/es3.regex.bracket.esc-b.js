// ES3: 15.10.2.19 ClassEscape
// ClassEscape :: b
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

if (/[\b]/.test("\b")) {
  console.log("es3.regex.bracket.esc-b.js: OK");
} else {
  console.log("es3.regex.bracket.esc-b.js: FAIL");
}
