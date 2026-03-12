#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var fs = require("fs");
var path = require("path");

require(path.join(__dirname, "continuum-dist", "continuum.js"));
var continuum = global.continuum;

function readline() {
  var b = Buffer.alloc(1), out = [];
  var n = 0;
  while ((n = fs.readSync(0, b, 0, 1, null)) > 0 && b[0] !== 0x0a) out.push(b[0]);
  return (n > 0 || out.length) ? Buffer.from(out).toString("utf8") : null;
}

function isQuiet(value) {
  return !!(value && value.constructor && value.constructor.name === "Undetectable" && value.value === "quiet");
}

function getProperty(value, key) {
  if (!value || typeof value.Get !== "function") return undefined;
  try {
    return value.Get(key);
  } catch (e) {
    return undefined;
  }
}

function formatThrownValue(value) {
  var name = getProperty(value, "name");
  var message = getProperty(value, "message");
  if (typeof name === "string" && name) {
    return typeof message === "string" && message ? name + ": " + message : name;
  }
  return String(value);
}

function printAbrupt(result) {
  if (!(result && result.Abrupt)) return false;
  console.error("Uncaught exception: " + formatThrownValue(result.value));
  return true;
}

var realm = continuum.createRealm();
realm.on("write", function(v) { console.log(v); });
if (realm.useConsole) realm.useConsole(console);

var scriptArgs = process.argv.slice(2);
if (scriptArgs.length > 0) {
  for (var i = 0; i < scriptArgs.length; i++) {
    var file = scriptArgs[i];
    var r = realm.evaluate(fs.readFileSync(file, "utf8"));
    if (printAbrupt(r)) {
      process.exitCode = 1;
      break;
    }
  }
} else {
  while (true) {
    process.stdout.write("continuum> ");
    var line = readline();
    if (line == null) break;
    if (!line.trim()) continue;
    var r = realm.evaluate(line);
    if (!(r && r.Abrupt)) {
      var v = r && r.Completion ? r.value : r;
      if (typeof v !== "undefined" && !isQuiet(v)) {
        console.log(v);
      }
    } else {
      printAbrupt(r);
    }
  }
}
