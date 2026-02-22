#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

const fs = require("fs");
const path = require("path");

require(path.join(__dirname, "continuum-dist", "continuum.js"));
const continuum = globalThis.continuum;

function readline() {
  const b = Buffer.alloc(1), out = [];
  let n = 0;
  while ((n = fs.readSync(0, b, 0, 1, null)) > 0 && b[0] !== 0x0a) out.push(b[0]);
  return (n > 0 || out.length) ? Buffer.from(out).toString("utf8") : null;
}

const realm = continuum.createRealm();
realm.on("write", (v) => console.log(v));
if (realm.useConsole) realm.useConsole(console);

const scriptArgs = process.argv.slice(2);
if (scriptArgs.length > 0) {
  for (const file of scriptArgs) {
    const r = realm.evaluate(fs.readFileSync(file, "utf8"));
    if (r && r.Abrupt) {
      break;
    }
  }
} else {
  while (true) {
    process.stdout.write("continuum> ");
    const line = readline();
    if (line == null) break;
    if (!line.trim()) continue;
    const r = realm.evaluate(line);
    if (!(r && r.Abrupt)) {
      const v = r && r.Completion ? r.value : r;
      if (typeof v !== "undefined" && !(v && v.constructor && v.constructor.name === "Undetectable" && v.value === "quiet")) {
        console.log(v);
      }
    }
  }
}
