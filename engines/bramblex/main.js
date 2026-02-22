#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

const fs = require("fs");

const jsjs = require("./lib/interpreter.js");

function readline() {
  const buf = Buffer.alloc(1), bytes = [];
  while (fs.readSync(0, buf) > 0 && buf[0] != 0x0A) bytes.push(buf[0]);
  return (bytes.length || buf[0]) ? Buffer.from(bytes).toString('utf-8') : null;
}

const scriptArgs = process.argv.slice(2);

const host = {
  console: console,
  print: (...args) => console.log(...args),
};

try {
  if (scriptArgs.length > 0) {
    const code = scriptArgs.map((f) => fs.readFileSync(f, "utf8")).join("\n");
    jsjs.run(code, host);
  } else {
    while (true) {
      process.stdout.write("bramblex> ");
      const line = readline();
      if (line == null) break;
      try {
        jsjs.run(line, host);
      } catch (e) {
        console.log("Uncaught " + e);
      }
    }
  }
} catch (e) {
  const msg = e && e.stack ? e.stack : String(e);
  console.error(msg);
  process.exit(1);
}
