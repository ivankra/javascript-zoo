#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

const fs = require("fs");
const path = require("path");

const { Interpreter } = require(path.join(__dirname, "eval5-dist", "eval5.js"));

function readline() {
  const buf = Buffer.alloc(1), bytes = [];
  while (fs.readSync(0, buf) > 0 && buf[0] != 0x0A) bytes.push(buf[0]);
  return (bytes.length || buf[0]) ? Buffer.from(bytes).toString('utf-8') : null;
}

const scriptArgs = process.argv.slice(2);

try {
  const interpreter = new Interpreter({
    console: console,
    print: (...args) => console.log(...args),
  });

  if (scriptArgs.length > 0) {
    const code = scriptArgs.map((f) => fs.readFileSync(f, "utf8")).join("\n");
    interpreter.evaluate(code);
  } else {
    while (true) {
      process.stdout.write("eval5> ");
      const line = readline();
      if (line == null) break;
      try {
        const res = interpreter.evaluate(line);
        if (typeof res !== "undefined") {
          if (res && typeof res === "object") {
            console.log(JSON.stringify(res));
          } else {
            console.log(String(res));
          }
        }
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
