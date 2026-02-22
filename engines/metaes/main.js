#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

const fs = require("fs");

const { metaesEval, uncps } = require("./build/lib");

function readline() {
  const buf = Buffer.alloc(1), bytes = [];
  while (fs.readSync(0, buf) > 0 && buf[0] != 0x0A) bytes.push(buf[0]);
  return (bytes.length || buf[0]) ? Buffer.from(bytes).toString("utf-8") : null;
}

const scriptArgs = process.argv.slice(2);
const evalSync = uncps(metaesEval);
const env = {
  values: {
    print: console.log,
    console: { log: console.log },
  },
};

try {
  if (scriptArgs.length > 0) {
    const code = scriptArgs.map((f) => fs.readFileSync(f, "utf8")).join("\n");
    evalSync(code, env);
  } else {
    while (true) {
      process.stdout.write("metaes> ");
      const line = readline();
      if (line == null) break;
      if (!line.trim()) continue;
      try {
        const value = evalSync(line, env);
        if (value && typeof value === "object") {
          console.log(JSON.stringify(value));
        } else if (typeof value !== "undefined") {
          console.log(String(value));
        }
      } catch (err) {
        console.error("Uncaught " + err);
      }
    }
  }
} catch (e) {
  const msg = e && e.stack ? e.stack : String(e);
  console.error(msg);
  process.exit(1);
}
