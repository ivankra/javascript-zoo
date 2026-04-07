// Alternative script runner and REPL for engine262 compatible with
// JSC/V8/SpiderMonkey/GraalJS shells using their builtins instead of Node.
//
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

import * as engine262 from './lib/engine262.mjs';

const HELP = `
engine262_jsc

Usage:

    engine262_jsc [options]
    engine262_jsc [options] [input file]

Options:

    -h, --help         Show help (this screen)
    -m, --module       Evaluate contents of input-file as a module.
    --features=...     A comma separated list of features.
    --features=all     Enable all features.
`;

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
    globalThis.scriptArgs = Array.prototype.slice.call(arguments);
  }
}
if (typeof scriptArgs !== 'undefined') {
  // Some shells need -- (./jsc script.js -- args), some don't, drop for consistency.
  if (scriptArgs.length > 0 && scriptArgs[0] === '--') {
    scriptArgs.shift();
  }
}

function parseArgs(args) {
  const options = {
    features: [],
    files: [],
    help: false,
    module: false,
  };

  if (!args || typeof args.length !== 'number') {
    return options;
  }

  for (const rawArg of args) {
    const arg = String(rawArg);
    if (arg === '-h' || arg === '--help') {
      options.help = true;
      continue;
    }
    if (arg === '-m' || arg === '--module') {
      options.module = true;
      continue;
    }
    if (arg.startsWith('--features=')) {
      const value = arg.slice('--features='.length);
      if (value === 'all') {
        if (!Array.isArray(engine262.FEATURES)) {
          throw new Error('engine262.FEATURES is not available in this build');
        }
        options.features = engine262.FEATURES.map((feature) => feature.flag);
      } else {
        options.features = value.split(',').filter(Boolean);
      }
      continue;
    }
    options.files.push(arg);
  }

  return options;
}

function createResolverCache() {
  if (typeof engine262.ModuleCache === 'function') {
    return new engine262.ModuleCache();
  }
  const cache = new Map();
  return {
    has(key, type) {
      return cache.has(`${type}:${key}`);
    },
    get(key, type) {
      return cache.get(`${type}:${key}`);
    },
    set(key, type, value) {
      cache.set(`${type}:${key}`, value);
    },
  };
}

function normalizePath(path) {
  const absolute = path.startsWith('/');
  const parts = path.split('/');
  const normalized = [];
  for (const part of parts) {
    if (!part || part === '.') {
      continue;
    }
    if (part === '..') {
      if (normalized.length > 0 && normalized[normalized.length - 1] !== '..') {
        normalized.pop();
      } else if (!absolute) {
        normalized.push(part);
      }
      continue;
    }
    normalized.push(part);
  }
  const joined = normalized.join('/');
  if (absolute) {
    return joined ? `/${joined}` : '/';
  }
  return joined || '.';
}

function dirname(path) {
  const normalized = normalizePath(path);
  if (normalized === '/') {
    return '/';
  }
  const slash = normalized.lastIndexOf('/');
  if (slash === -1) {
    return '.';
  }
  if (slash === 0) {
    return '/';
  }
  return normalized.slice(0, slash);
}

function resolvePath(base, specifier) {
  if (specifier.startsWith('/')) {
    return normalizePath(specifier);
  }
  return normalizePath(`${base}/${specifier}`);
}

function loadImportedModuleSync(referrer, specifier, attributes, _hostDefined, finish) {
  const realm = referrer instanceof engine262.ManagedRealm ? referrer : referrer.Realm;
  const cache = realm.HostDefined.resolverCache;
  const type = attributes.get('type') || (specifier.endsWith('.json') ? 'json' : 'js');

  if (!referrer.HostDefined || !referrer.HostDefined.specifier) {
    finish(engine262.Throw.SyntaxError('Could not resolve module "$1" from a module with no source location', specifier));
    return;
  }
  if (attributes.get('type') && attributes.get('type') !== 'json' && attributes.get('type') !== 'text') {
    finish(engine262.Throw.TypeError('Unsupported import type "$1" (only "json" and "text" are supported)', attributes.get('type')));
    return;
  }

  const resolved = resolvePath(dirname(referrer.HostDefined.specifier), specifier);
  if (cache && cache.has(resolved, type)) {
    finish(cache.get(resolved, type));
    return;
  }

  let source;
  try {
    source = read(resolved);
  } catch (_) {
    finish(engine262.Throw.SyntaxError('Could not read module $1', specifier));
    return;
  }

  let module;
  if (type === 'text') {
    module = realm.createTextModule(source);
  } else if (type === 'json') {
    module = realm.createJSONModule(source);
  } else {
    module = realm.compileModule(source, { specifier: resolved });
  }
  const completion = engine262.EnsureCompletion(module);
  if (completion.Type === 'throw') {
    finish(completion);
    return;
  }
  if (cache) {
    cache.set(resolved, type, completion.Value);
  }
  finish(completion.Value);
}

function createE262Realm(name, specifier, features) {
  const agent = new engine262.Agent({
    features,
    supportedImportAttributes: ['type'],
    loadImportedModule: loadImportedModuleSync,
  });
  engine262.setSurroundingAgent(agent);

  const realm = new engine262.ManagedRealm({
    resolverCache: createResolverCache(),
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

  engine262.createTest262Intrinsics(realm, true, console.log);

  return realm;
}

function runE262(realm, source, filename, echoResult, asModule) {
  realm.scope(() => {
    const c = engine262.evalQ((Q) => {
      if (asModule) {
        const module = Q(realm.compileModule(source, { specifier: filename }));
        realm.HostDefined.resolverCache.set(filename, 'js', module);
        const load = Q(module.LoadRequestedModules());
        if (load.PromiseState === 'rejected') {
          Q(engine262.ThrowCompletion(load.PromiseResult));
        } else if (load.PromiseState === 'pending') {
          throw new Error('Internal error: .LoadRequestedModules() returned a pending promise');
        }
        Q(module.Link());
        const evaluate = Q(engine262.skipDebugger(module.Evaluate()));
        if (evaluate.PromiseState === 'rejected') {
          Q(engine262.ThrowCompletion(evaluate.PromiseResult));
        }
        return engine262.Value.undefined;
      }
      return Q(realm.evaluateScript(source, { specifier: filename }));
    });
    if (c instanceof engine262.AbruptCompletion) {
      const inspected = engine262.inspect(c);
      if (inspected.startsWith('\n')) {
        const error = inspected.match(/\n([A-Za-z]+Error: .*)$/m);
        if (error) {
          print(`Uncaught exception: ${error[1]}\n${inspected}`);
          return;
        }
      }
      print(`Uncaught exception: ${inspected}`);
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

function runRepl(features) {
  const realm = createE262Realm('repl', '<repl>', features);
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
    runE262(realm, line, '<repl>', true, false);
  }
}

const options = parseArgs(typeof scriptArgs === 'undefined' ? [] : scriptArgs);

if (options.help) {
  print(HELP.trim());
} else if (options.files.length === 0) {
  runRepl(options.features);
} else {
  const realm = createE262Realm('jsc', options.files[0], options.features);
  for (const filename of options.files) {
    const code = read(filename);
    runE262(realm, code, filename, false, options.module || filename.endsWith('.mjs'));
  }
}
