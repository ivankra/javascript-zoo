// Per-engine configuration for conformance/lib.py.
//
// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

local println_js = 'var console = {log: println}, print = println;';
local prelude_print = { file: 'bench/prelude-print.js' };
local prelude_es5 = { file: 'bench/prelude-es5.js' };
local prelude_strict = { file: 'bench/prelude-strict.js' };

// Old SpiderMonkey versions (1.5–1.8.5): need print() + ES5 polyfills.
local sm_old = {
  bench_prelude: [prelude_print, prelude_es5],
  exceptions_re: [
    // "/tmp/x.js:1: ReferenceError: x is not defined"
    '^\\S+: (?P<type>[A-Za-z]*Error): (?P<message>.+)$',
    // "uncaught exception: Error: x"
    '^uncaught exception: (?P<type>[A-Za-z]*Error): (?P<message>.+)$',
  ],
};

// Most common pattern to report exceptions, e.g. "ReferenceError: x is undefined"
local exception_colon_message = '^(?P<type>[A-Za-z]*Error): (?P<message>.+)$';

{
  '42tiny-js': {
    exceptions_re: ['^(?P<type>[A-Za-z]*Error): (?P<message>.+?)(?: at Line:[0-9]+ Column:[0-9]+)*$'],
  },

  ant: {
    exceptions_re: [@"^(?:\u001b\[[0-9;]*m)?(?P<type>[A-Za-z]*Error)(?:\u001b\[[0-9;]*m)?: (?:\u001b\[[0-9;]*m)?(?P<message>.+?)(?:\u001b\[[0-9;]*m)?$"],
    test262_prelude: 'var print = console.log.bind(console);',
  },

  besen: {
    bench_suite: ['richards.js', 'crypto.js', 'deltablue.js', 'navier-stokes.js'],
    bench_ignore_errors: true,
  },

  boa: {
    module_flag: '--module',
    exceptions_re: [
      @"^[ ]*[0-9]+: (?:\u001b\[[0-9;]*m)?(?P<type>[A-Za-z]*Error)(?:\u001b\[[0-9;]*m)?: (?P<message>.+?)(?:\u001b\[[0-9;]*m)?$",
      '^Uncaught: (?P<type>[A-Za-z]*Error): (?P<message>.+?)(?: \\(.+\\))?$',
      @'^Uncaught: "(?P<message>.+?)\]?"$',
    ],
    test262_flags: ['--debug-object'],
    test262_prelude: { file: 'engines/boa/test262-prelude.js' },
  },

  bramblex: {
    exceptions_re: [exception_colon_message],
  },

  brimstone: {
    exceptions_re: [exception_colon_message],
  },

  castl: {
    errors_re: ['(?i)(error|unsupported|200 local variables)'],
  },

  'cesanta-v7': {
    bench_suite: ['richards.js'],
    multiple_scripts: 'shared',
  },

  chakracore: {
    exceptions_re: [exception_colon_message],
  },

  dmdscript: {
    bench_prelude: [println_js, prelude_es5],
    stderr_replace_re: { '^1 source files$': '' },
  },

  duktape: {
    exceptions_re: [exception_colon_message],
  },

  dscriptcpp: {
    bench_suite: ['richards.es1.js'],
    bench_prelude: [println_js, prelude_es5],
  },

  'echosoar-jsi': {
    bench_transforms: ['hex'],
  },

  echosoar: {
    exceptions_re: ['^\\S+: JSIError \\{ error_type: (?P<type>[A-Za-z]*Error), message: "(?P<message>[^"]*)"'],
  },

  ejscript: {
    exceptions_re: ['^ejs: (?P<type>[A-Za-z]*Error): (?P<message>.+)$'],
  },

  engine262: {
    exceptions_re: [exception_colon_message],
    test262_prelude: { file: 'engines/engine262/test262-prelude.js' },
  },

  eval5: {
    exceptions_re: [exception_colon_message],
  },

  'fastschema-qjs': {
    exceptions_re: ['^Error: (?P<type>[A-Za-z]*Error): (?P<message>.+)$'],
  },

  flathead: {
    exceptions_re: [exception_colon_message],
  },

  goja: {
    exceptions_re: [exception_colon_message],
  },

  graaljs: {
    exceptions_re: [exception_colon_message],
  },

  escargot: {
    multiple_scripts: 'shared',
    exceptions_re: ['^Uncaught (?P<type>[A-Za-z]+Error): (?P<message>.+)$'],
  },

  espruino: {
    stdout_replace_re: { '^([| ]____|[|]  |.*espruino.com|.*G.William|Espruino is Open Source|only by sales).*': '' },
    exceptions_re: ['^Uncaught (?P<type>[A-Za-z]*Error): (?P<message>.+)$'],
  },

  hermes: {
    bench_flags: ['-O', '-w'],
    console_log: 'print',
    exceptions_re: ['^Uncaught (?P<type>[A-Za-z]*Error): (?P<message>.+)$'],
    // "file.js:14:3: error: invalid statement encountered."
    errors_re: [@'[^ ]+:[0-9]+:[0-9]+: error: (?P<message>.+?)[.]?$'],
    test262_prelude: { file: 'engines/hermes/test262-prelude.js' },
  },

  'hermes-v1': $.hermes {},

  'iv-lv5': {
    exceptions_re: [
      // "SyntaxError: file.js:10: SyntaxError: unexpected token class"
      @'^(?P<type>[A-Za-z]*Error): [^ ]+:[0-9]+: \1: (?P<message>.+)$',
      exception_colon_message,
    ],
  },

  jerryscript: {
    bench_timeout_for_test: { 'splay.js': 300, 'typescript.js': 3600 },
    multiple_scripts: 'shared',
    exceptions_re: [
      '^Unhandled exception: (?P<type>[A-Za-z]*Error)(?:: )?(?P<message>.*)$',
    ],
  },

  jsc: {
    console_log: 'print',
    multiple_scripts: 'shared',
    exceptions_re: ['^Exception: (?P<type>[A-Za-z]*Error): (?P<message>.+)$'],
    test262_prelude: { file: 'engines/jsc/test262-prelude.js' },
  },

  kjs: {
    stderr_replace_re: { '^LEAK: [0-9]+ KJS::Node$': '' },
    exceptions_re: ['^\\S+ \\(line [0-9]+\\): (?P<type>[A-Za-z]*Error): (?P<message>.+)$'],
  },

  kodjodevf: {
    exceptions_re: ['^\\S+: (?P<type>[A-Za-z]*Error): (?P<message>.+)$'],
  },

  lebjs: {
    bench_suite: ['richards.quad-wheel.js'],
  },

  libjs: {
    stdout_replace_re: {
      // console.log output gets quoted
      '(?m)^"(.*)"$': '\\1',
    },
    stderr_replace_re: {
      // Normalize multiline exception
      'Uncaught exception: \\n\\[([A-Za-z]*Error)\\] ': '\\1: ',
    },
    exceptions_re: ['^(?P<type>[A-Za-z]*Error): (?P<message>.+)$'],
    test262_prelude: { file: 'engines/libjs/test262-prelude.js' },
  },

  mocha: {
    bench_suite: ['richards.es1.js'],
    bench_prelude: ['var console = new Object(); console.log = print;'],
    errors_re: ['^Mocha: '],
  },

  mquickjs: {
    bench_prelude: [prelude_strict],
    exceptions_re: ['^(?:\u001b\\[[0-9;]*m)?(?P<type>[A-Za-z]*Error): (?P<message>[^\u001b\\n]+)'],
  },

  'modernc-quickjs': {
    exceptions_re: ['^Error: (?P<type>[A-Za-z]*Error): (?P<message>.+)$'],
  },

  mujs: {
    exceptions_re: [exception_colon_message],
  },

  narcissus: {
    bench_suite: ['richards.js1.js'],
  },

  nashorn: {
    bench_flags: ['--language=es6'],
    multiple_scripts: 'shared',
    test262_prelude: { file: 'engines/nashorn/test262-prelude.js' },
  },

  ngs: {
    bench_suite: ['richards.tiny-js.js'],
    bench_prelude: ['var console = {log: print};'],
  },

  njs: {
    bench_prelude: [prelude_strict],
    bench_transforms: ['octal'],
  },

  node: {
    exceptions_re: [exception_colon_message],
    test262_prelude: { file: 'engines/v8/test262-prelude-node.js' },
  },

  nova: {
    bench_flags: ['eval', '--no-strict'],
    console_log: 'print',
    flags: ['eval'],
    module_flag: '--module',
    exceptions_re: ['^Uncaught exception: (?P<type>[A-Za-z]*Error): (?P<message>.+)$'],
    test262_prelude: 'var console = {log: print};',
    warnings_re: ['^Parse errors:$'],
    errors_re: ["(^  x |^error:|Error:|TypeError|(?:error|panic|exception|uncaught|mismatch|failed|invalid|incorrect|unsupported|cannot|can't))"],
  },

  otto: {
    exceptions_re: [exception_colon_message],
  },

  porffor: {
    bench_suite: ['richards.porffor.js'],
    bench_prelude: ['var print=console.log;'],
  },

  'quad-wheel': {
    bench_suite: ['richards.quad-wheel.js'],
  },

  quanta: {
    bench_suite: ['richards.quanta.js'],
    bench_prelude: ['var print=console.log;'],
  },

  quickjs: {
    module_flag: '--module',
    exceptions_re: [exception_colon_message],
  },

  // quick's run-test262 binary
  quickjs_262: {
    flags: ['-N'],  // -N: run test prepared by test262-harness+eshost
    console_log: 'print',  // no console.log()
    module_flag: '--module',
  },

  'quickjs-ng': {
    flags: ['--script'],
    module_flag: '--module',
    exceptions_re: [exception_colon_message],
    test262_prelude: 'var print = console.log.bind(console);',
  },

  qv4: {
    bench_transforms: ['octal'],
    stderr_replace_re: { @'qt\.qml\.usedbeforedeclared:': '' },
    exceptions_re: ['^Uncaught exception: (?P<type>[A-Za-z]*Error): (?P<message>.+)$'],
  },

  rapidus: {
    bench_suite: ['richards.rapidus.js'],
    bench_prelude: ['var print=console.log;'],
  },

  'rpython-langjs': {
    multiple_scripts: 'shared',
    exceptions_re: ['^ERROR in [^:]+: (?P<type>[A-Za-z]*Error): (?P<message>.+)$'],
  },

  'rust-js': {
    exceptions_re: ['^\\S+: (?P<type>[A-Za-z]*Error)(?:: (?P<message>.+))?$'],
  },

  sablejs: {
    warnings_re: [@'\[WARN\]'],
  },

  spidermonkey: {
    // "/tmp/x.js:1:3 ReferenceError: x is not defined"
    exceptions_re: ['^[^ ]+ (?P<type>[A-Za-z]*Error): (?P<message>.+)$'],
    test262_prelude: { file: 'engines/spidermonkey/test262-prelude.js' },
  },

  sobek: {
    exceptions_re: [exception_colon_message],
  },

  sophonjs: {
    exceptions_re: ['^exception (?P<type>[A-Za-z]*Error):(?P<message>.+)$'],
  },

  sval: {
    exceptions_re: [exception_colon_message],
  },

  'spidermonkey_1.5': sm_old,
  'spidermonkey_1.6': sm_old,
  'spidermonkey_1.7': sm_old,
  'spidermonkey_1.8.0': sm_old,
  'spidermonkey_1.8.5': sm_old {
    bench_flags: ['-jm'],
  },

  spidermonkey_17: {
    bench_flags: ['-m'],
    // "/tmp/x.js:1:3 ReferenceError: x is not defined"
    exceptions_re: ['^[^ ]+ (?P<type>[A-Za-z]*Error): (?P<message>.+)$'],
  },

  starlight: {
    bench_suite: ['richards.js1.js'],
  },

  'tiny-js': {
    bench_suite: ['richards.tiny-js.js'],
    bench_prelude: ['var console={log: print};'],
    errors_re: ['^ERROR:(?: Error)?(?P<message>.+?)( at [(]line: [0-9]+, col: [0-9]+[)])*$'],
  },

  topchetoeu: {
    multiple_scripts: 'shared',
  },

  twostroke: {
    bench_suite: ['richards.es1.js'],
  },

  ucode: {
    bench_suite: ['richards.ucode.js'],
  },

  v8: {
    module_flag: '--module',
    exceptions_re: ['^[^:]+:[0-9]+: (?P<type>[A-Za-z]*Error): (?P<message>.+)$'],
    test262_flags: ['--harmony', '--future', '--js-staging'],
    test262_prelude: { file: 'engines/v8/test262-prelude.js' },
  },

  xs: {
    multiple_scripts: 'shared',
    exceptions_re: [exception_colon_message],
    test262_prelude: { file: 'engines/xs/test262-prelude.js' },
  },

  yavashark: {
    bench_flags: ['-i'],
    exceptions_re: ['^Error: (?P<type>[A-Za-z]*Error): (?P<message>.+)$'],
  },

  zhuzilin: {
    exceptions_re: [@"^(?:\u001b\[[0-9;]*m)?(?:Uncaught )?(?P<type>[A-Za-z]*Error): (?P<message>.+?)(?:\u001b\[[0-9;]*m)?$"],
  },
}
