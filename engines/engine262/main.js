// Alternative script runner and REPL for engine262 compatible with
// JSC/V8/SpiderMonkey/GraalJS shells using their builtins instead of Node.
//
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

import * as engine262 from './lib/engine262.mjs';

if (typeof print === 'undefined') {
  globalThis.print = function(s) { console.log(s); };
}
if (typeof console === 'undefined') {
  globalThis.console = {};
}
if (typeof console.log === 'undefined') {
  console.log = function(...args) { print(args.join(' ')); };
}

if (typeof putstr === 'undefined') {
  globalThis.putstr = function(s) {
    if (typeof d8 !== 'undefined' && typeof write !== 'undefined') {
      write(s);
    } else if (typeof process === 'object') {
      process.stdout.write(s);
    } else {
      print(s);
    }
  };
}

if (typeof read === 'undefined') {
  if (typeof readFile === 'function') {
    globalThis.read = function(s) {
      return readFile(s);
    };
  } else if (typeof require === 'function') {
    globalThis.read = function(s) {
      return require('fs').readFileSync(s, 'utf8');
    };
  }
}

if (typeof readline === 'undefined') {
  globalThis.readline = function() {
    const fs = require('fs'), buf = Buffer.alloc(1), bytes = [];
    while (fs.readSync(0, buf) > 0 && buf[0] != 0x0A) {
      bytes.push(buf[0]);
    }
    return (bytes.length || buf[0]) ? Buffer.from(bytes).toString('utf-8') : null;
  };
}

if (typeof scriptArgs === 'undefined') {
  if (typeof process === 'object' && process.argv.length >= 2) {
    globalThis.scriptArgs = process.argv.slice(2);
  } else if (typeof arguments === 'object' && typeof arguments[0] === 'string') {
    globalThis.scriptArgs = new Array(arguments);
  }
}
if (typeof scriptArgs !== 'undefined') {
  // Some shells need -- (./jsc script.js -- args), some don't, drop for consistency.
  if (scriptArgs.length > 0 && scriptArgs[0] === '--') {
    scriptArgs.shift();
  }
}

function createE262Realm(name, specifier) {
  const agent = new engine262.Agent();
  engine262.setSurroundingAgent(agent);

  const realm = new engine262.ManagedRealm({
    resolverCache: new Map(),
    name,
    specifier
  });

  // Add console.log() inside engine262 realm using host print().
  realm.scope(() => {
    const consoleObj = engine262.OrdinaryObjectCreate.from({
      log(...args) {
        print(args.map((arg) => engine262.inspect(arg)).join(' '));
        return engine262.Value.undefined;
      },
    });
    engine262.CreateNonEnumerableDataPropertyOrThrow(
      realm.GlobalObject,
      engine262.Value('console'),
      consoleObj,
    );
  });

  engine262.createTest262Intrinsics(realm, true);

  return realm;
}

function runE262(realm, source, filename, echoResult) {
  realm.scope(() => {
    const c = engine262.evalQ((Q) => {
      return Q(realm.evaluateScript(source, { specifier: filename }));
    });
    if (c instanceof engine262.AbruptCompletion) {
      print('Error: ' + engine262.inspect(c));
      return;
    }
    if (echoResult) {
      const value = c instanceof engine262.NormalCompletion ? c.Value : c;
      if (value !== engine262.Value.undefined) {
        print('' + engine262.inspect(value));
      }
    }
  });
}

function runRepl() {
  const realm = createE262Realm('repl', '<repl>');
  let lastLine = null;
  while (true) {
    putstr('engine262> ');
    const line = readline();
    // Some shells return empty string on EOF.
    if (line == null || (line === '' && lastLine === '')) {
      break;
    }
    lastLine = line;
    if (line === '') {
      continue;
    }
    runE262(realm, line, '<repl>', true);
  }
}

if (typeof scriptArgs === 'undefined' || scriptArgs.length === 0) {
  runRepl();
} else {
  const realm = createE262Realm('jsc', scriptArgs[0]);
  for (const filename of scriptArgs) {
    const code = read(filename);
    runE262(realm, code, filename);
  }
}
