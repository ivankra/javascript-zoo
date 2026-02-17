#!/usr/bin/env node
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function compileFile(scriptPath) {
  const { spawnSync } = require('child_process');
  const fs = require('fs');
  const path = require('path');
  const os = require('os');

  const compiler = path.join(__dirname, `sablejs-dist/sablejs-linux-${process.arch}`);
  const script = path.resolve(scriptPath);
  const temp = path.join(os.tmpdir(), path.basename(script) + '.sablejs');
  const result = spawnSync(compiler, ['-s', '-i', script, '-o', temp]);
  if (result.error || /^\[ERROR\]/.test(result.stdout + result.stderr) || !fs.existsSync(temp)) {
    console.error(result.error || (result.stdout + result.stderr).toString());
    fs.existsSync(temp) && fs.unlinkSync(temp);
    process.exit(1);
  }

  const compiled = fs.readFileSync(temp, 'utf8');
  fs.unlinkSync(temp);
  return compiled;
}

if (process.argv.length < 3) {
  console.error(`Usage: ${process.argv[1]} test.js ...`);
  process.exit(1);
}

const VM = require('./sablejs-dist/runtime')();
const vm = new VM();

const vGlobal = vm.getGlobal();
const vConsole = vm.createObject();
const vLog = vm.createFunction("log", function () {
  var temp = [];
  for (let i = 0; i < arguments.length; i++) {
    temp.push(vm.asString(arguments[i]));
  }

  console.log(...temp);
  return vm.createUndefined();
});

vm.setProperty(vConsole, "log", vLog);
vm.setProperty(vGlobal, "console", vConsole);

try {
  for (let i = 2; i < process.argv.length; i++) {
    const compiled = compileFile(process.argv[i]);
    vm.run(compiled, true);
  }
  vm.destroy();
} catch (e) {
  console.log("" + e);
}
