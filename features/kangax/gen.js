#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const operation = args[0];

const DEFAULT_DATA_FILES = [
  'data-es5.js',
  'data-es6.js',
  'data-es2016plus.js',
  'data-esnext.js',
  'data-esintl.js',
  //'data-non-standard.js'
];

function processExec(fn) {
  if (typeof fn !== 'function') {
    return fn;
  }

  const match = fn.toString().match(/^function *\(\) *\{(?: ?\/\*|)\n(.*)\n *(?:\*\/|)}$/s);
  if (!match) {
    console.log(`processExec: can't handle fn.toString()=${JSON.stringify(fn.toString())}`);
    return null;
  }

  const code = match[1];
  const lines = code.split('\n');
  const nonEmptyLines = lines.filter(line => line.trim().length > 0);

  if (nonEmptyLines.length === 0) {
    return code;
  }

  const minIndent = Math.min(...nonEmptyLines.map(line => {
    const match = line.match(/^(\s*)/);
    return match ? match[1].length : 0;
  }));

  const normalizedLines = lines.map(line => {
    if (line.trim().length === 0) {
      return '';
    }
    return line.substring(minIndent);
  });

  return normalizedLines.join('\n');
}

function indentCode(code, indent) {
  const lines = code.split('\n');
  return lines.map(line => {
    if (line.trim().length === 0) {
      return '';
    }
    return indent + line;
  }).join('\n');
}

function processTests(tests) {
  return tests.map(test => {
    const newTest = { ...test };
    delete newTest.res;

    if (newTest.exec) {
      newTest.exec = processExec(newTest.exec);
    }

    if (newTest.subtests) {
      newTest.subtests = newTest.subtests.map(subtest => {
        const newSubtest = { ...subtest };
        delete newSubtest.res;

        if (newSubtest.exec) {
          newSubtest.exec = processExec(newSubtest.exec);
        }

        return newSubtest;
      });
    }

    return newTest;
  });
}

function buildMap(name, tests) {
  const map = {};

  tests.forEach(test => {
    const category = test.category ? `${test.category} > ` : '';
    const significance = test.significance ? ` (${test.significance})` : '';

    if (test.subtests) {
      test.subtests.forEach(subtest => {
        const key = `${name} > ${category}${test.name}${significance} > ${subtest.name}`;
        map[key] = "";
      });
    } else {
      const key = `${name} > ${category}${test.name}${significance}`;
      map[key] = "";
    }
  });

  return map;
}

function mapOp() {
  let mapFile = 'gen-map.json';
  let dataFile = 'gen-data.json';
  let jsPattern = '(es|annexb|non-standard).*\\.js';
  let inputFiles = [];

  for (let i = 1; i < args.length; i++) {
    if (args[i] === '-m') {
      mapFile = args[++i];
    } else if (args[i] === '-p') {
      dataFile = args[++i];
    } else if (args[i] === '-t') {
      jsPattern = args[++i];
    } else {
      inputFiles.push(args[i]);
    }
  }

  if (inputFiles.length === 0) {
    inputFiles = DEFAULT_DATA_FILES;
  }

  for (const inputFile of inputFiles) {
    if (!fs.existsSync(inputFile)) {
      console.error(`Error: Input file not found: ${inputFile}`);
      process.exit(1);
    }
  }

  const map = {};
  const processedData = [];

  for (const inputFile of inputFiles) {
    const data = require(path.resolve(inputFile));

    const output = {
      name: data.name,
      tests: processTests(data.tests)
    };

    processedData.push(output);

    const fileMap = buildMap(data.name, data.tests);
    Object.assign(map, fileMap);
  }

  const regex = new RegExp('^' + jsPattern + '$');
  const files = fs.readdirSync('.').filter(file => regex.test(file));
  console.log(`Scanning ${files.length} files matching pattern '${jsPattern}'...`);

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    const compatLine = lines.find(line => line.trim().startsWith('// compat-table:'));
    if (compatLine) {
      const key = compatLine.replace(/^\/\/\s*compat-table:\s*/, '').trim();

      if (!(key in map)) {
        console.warn(`"${key}" (${file}): not in input data files, skipping`);
        continue;
      }

      if (map[key] === '') {
        map[key] = file;
      } else {
        console.warn(`"${key}": duplicated in ${map[key]} and ${file}`);
      }
    }
  }

  fs.writeFileSync(mapFile, JSON.stringify(map, null, 2));
  console.log(`Generated ${mapFile}`);

  if (dataFile) {
    fs.writeFileSync(dataFile, JSON.stringify(processedData, null, 2));
    console.log(`Generated ${dataFile}`);
  }
}

function genTest(compatKey, filename, spec, mdn, evalcode, notes, prefix) {
  const outputPath = prefix ? path.join(prefix, filename) : filename;

  // Skip manually edited files, tagged as *.edited.js
  if (outputPath.indexOf('.edited') !== -1 && fs.existsSync(outputPath)) {
    console.log(`Skipping: ${outputPath}`);
    return;
  }

  let header = '';

  if (spec) {
    header += `// ES6: ${spec}\n`;
  }

  if (mdn) {
    header += `// MDN: ${mdn}\n`;
  }

  header += `// compat-table: ${compatKey}\n`;

  if (notes && notes.length > 0) {
    header += '//\n';
    notes.forEach(note => {
      const lines = note.split('\n');
      lines.forEach(line => {
        header += `// ${line}\n`;
      });
    });
  }

  header += `//\n`;
  header += `// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev\n`;
  header += `// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov\n`;
  header += `// SPDX-License-Identifier: MIT\n`;

  let script = '';

  // https://github.com/compat-table/compat-table/blob/master/runner_support.js
  // 70d05d4de500f81e5612aafdee014e1a8419fa75
  if (/\blacksGlobal\b/.test(evalcode)) {
    script += 'this.lacksGlobal = typeof global === "undefined";\n';
  }
  if (/\bglobal\b/.test(evalcode)) {
    script += 'if (typeof global === "undefined") global = this;\n';
  }
  if (/\blacksGlobalThis\b/.test(evalcode)) {
    script += 'this.lacksGlobalThis = typeof globalThis === "undefined";\n';
  }
  if (/\bglobalThis\b/.test(evalcode)) {
    script += 'if (typeof globalThis === "undefined") globalThis = this;\n';
  }
  if (/\b__script_executed\b/.test(evalcode)) {
    script += 'var __script_executed = {};\n' +
              'global.__script_executed = __script_executed;\n' +
              'if (typeof global !== "undefined") {\n' +
              '    global.__script_executed = __script_executed;\n' +
              '}\n';
  }
  if (/\b__createIterableObject\b/.test(evalcode)) {
    script += `
function __createIterableObject(arr, methods) {
  methods = methods || {};
  if (typeof Symbol !== "function" || !Symbol.iterator) {
    return {};
  }
  arr.length++;
  var iterator = {
    next: function() {
      return { value: arr.shift(), done: arr.length <= 0 };
    },
    "return": methods["return"],
    "throw": methods["throw"]
  };
  var iterable = {};
  iterable[Symbol.iterator] = function(){ return iterator; };
  return iterable;
}

if (typeof global !== "undefined") {
  global.__createIterableObject = __createIterableObject;
}
`;
  }

  script = header + (script == '' ? '' : '\n') + script;

  // indent-sensitive template literals test
  if (evalcode.indexOf('=== "foo bar\\nbaz qux"') === -1) {
    evalcode = indentCode(evalcode, '  ');
  }

  if (/\basyncTestPassed\b/.test(evalcode)) {
    script += `
var jobQueue = [];

function setTimeout(cb, time, cbarg) {
  var speedup = 10;
  var runTime = Date.now() + time/speedup;
  if (!jobQueue[runTime]) {
    jobQueue[runTime] = [];
  }
  jobQueue[runTime].push(function() {
    cb(cbarg);
  });
}

function flushQueue() {
  var curTime = Date.now();
  var empty = true;
  for (var runTime in jobQueue) {
    empty = false;
    if (curTime >= runTime) {
      var jobs = jobQueue[runTime];
      delete jobQueue[runTime];
      jobs.forEach(function (job) {
        job();
      });
    }
  }
  if (!empty) {
    Promise.resolve().then(flushQueue);
  }
}

function asyncTestPassed() {
  console.log("${filename}: OK");
}

function testCode() {
${evalcode}
}

try {
  testCode();
  Promise.resolve().then(flushQueue);
} catch (e) {
  console.log("${filename}: FAIL: " + e);
}`;
  } else if (/\bglobal\.test\b/.test(evalcode)) {
    script += `
global.test = function (expression) {
    if (expression) {
      console.log("${filename}: OK");
    }
}

function testCode() {
${evalcode}
}

try {
  testCode();
} catch (e) {
  console.log("${filename}: FAIL: " + e);
}`;
  } else {
    script += `
function testCode() {
${evalcode}
}

try {
  if (testCode()) {
    console.log("${filename}: OK");
  } else {
    console.log("${filename}: FAIL");
  }
} catch (e) {
  console.log("${filename}: FAIL: " + e);
}`;
  }

  const dir = path.dirname(outputPath);
  if (dir !== '.' && !fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, script);
  console.log(`Generated ${outputPath}`);
}

function genOp() {
  let mapFile = 'gen-map.json';
  let prefix = '';
  let inputFiles = [];

  for (let i = 1; i < args.length; i++) {
    if (args[i] === '-m') {
      mapFile = args[++i];
    } else if (args[i] === '-x') {
      prefix = args[++i];
    } else {
      inputFiles.push(args[i]);
    }
  }

  if (inputFiles.length === 0) {
    inputFiles = DEFAULT_DATA_FILES;
  }

  if (!fs.existsSync(mapFile)) {
    console.error(`Error: Map file not found: ${mapFile}`);
    console.error(`Run "node ${process.argv[1]} map data-es6.js [...]" first and edit it.`);
    process.exit(1);
  }

  for (const inputFile of inputFiles) {
    if (!fs.existsSync(inputFile)) {
      console.error(`Error: Input file not found: ${inputFile}`);
      process.exit(1);
    }
  }

  const map = require(path.resolve(mapFile));

  let generated = 0;
  let skipped = 0;

  for (const inputFile of inputFiles) {
    const rawData = require(path.resolve(inputFile));
    const data = {
      name: rawData.name,
      tests: processTests(rawData.tests)
    };

    data.tests.forEach(test => {
    const category = test.category ? `${test.category} > ` : '';
    const significance = test.significance ? ` (${test.significance})` : '';

    if (test.subtests) {
      test.subtests.forEach(subtest => {
        const key = `${data.name} > ${category}${test.name}${significance} > ${subtest.name}`;
        const filename = map[key];

        if (!filename) {
          console.error(`No filename mapping for key: ${key}`);
          skipped++;
          return;
        }

        if (!subtest.exec) {
          console.error(`No exec code for: ${key}`);
          skipped++;
          return;
        }

        if (Array.isArray(subtest.exec)) {
          console.warn(`Warning: Skipping array exec for: ${key}`);
          skipped++;
          return;
        }

        const notes = [];
        if (subtest.note_html) {
          notes.push(subtest.note_html.replace(/<[^>]+>/g, ''));
        }

        genTest(
          key,
          filename,
          subtest.spec || test.spec,
          subtest.mdn || test.mdn,
          subtest.exec,
          notes,
          prefix
        );
        generated++;
      });
    } else {
      const key = `${data.name} > ${category}${test.name}${significance}`;
      const filename = map[key];

      if (!filename) {
        console.error(`Warning: No filename mapping for key: ${key}`);
        skipped++;
        return;
      }

      if (!test.exec) {
        console.error(`Warning: No exec code for: ${key}`);
        skipped++;
        return;
      }

      if (Array.isArray(test.exec)) {
        console.warn(`Warning: Skipping array exec for: ${key}`);
        skipped++;
        return;
      }

      const notes = [];
      if (test.note_html) {
        notes.push(test.note_html.replace(/<[^>]+>/g, ''));
      }

      genTest(
        key,
        filename,
        test.spec,
        test.mdn,
        test.exec,
        notes,
        prefix
      );
      generated++;
    }
    });
  }

  console.log(`\nGenerated ${generated} test files, skipped ${skipped}`);
}

if (operation === 'map') {
  mapOp();
} else if (operation === 'gen') {
  genOp();
} else {
  console.log('Usage:');
  console.log(`  node ${process.argv[1]} map [-m gen-map.json] [-p gen-processed.json] [-t <test suite regex>] [data-es6.js ...] - Generate map and optional data JSON`);
  console.log(`  node ${process.argv[1]} gen [-m gen-map.json] [-x prefix] [data-es6.js ...]                                 - Generate test files`);
  console.log(`\nDefault data files: ${DEFAULT_DATA_FILES.join(', ')}`);
  process.exit(1);
}

/*
  "Non-standard > SIMD (Single Instruction, Multiple Data) > basic support": "non-standard.simd.basic.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > Float32x4": "non-standard.simd.Float32x4.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > Int32x4": "non-standard.simd.Int32x4.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > Int16x8": "non-standard.simd.Int16x8.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > Int8x16": "non-standard.simd.Int8x16.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > Uint32x4": "non-standard.simd.Uint32x4.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > Uint16x8": "non-standard.simd.Uint16x8.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > Uint8x16": "non-standard.simd.Uint8x16.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > Bool32x4": "non-standard.simd.Bool32x4.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > Bool16x8": "non-standard.simd.Bool16x8.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > Bool8x16": "non-standard.simd.Bool8x16.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%floatType%.abs": "non-standard.simd.floatType.abs.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.add": "non-standard.simd.type.add.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%integerType%.addSaturate": "non-standard.simd.integerType.addSaturate.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.and": "non-standard.simd.type.and.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%booleanType%.anyTrue": "non-standard.simd.booleanType.anyTrue.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%booleanType%.allTrue": "non-standard.simd.booleanType.allTrue.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.check": "non-standard.simd.type.check.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.equal": "non-standard.simd.type.equal.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.extractLane": "non-standard.simd.type.extractLane.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.greaterThan": "non-standard.simd.type.greaterThan.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.greaterThanOrEqual": "non-standard.simd.type.greaterThanOrEqual.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.lessThan": "non-standard.simd.type.lessThan.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.lessThanOrEqual": "non-standard.simd.type.lessThanOrEqual.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.mul": "non-standard.simd.type.mul.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%floatType%.div": "non-standard.simd.floatType.div.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.load": "non-standard.simd.type.load.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.load1": "non-standard.simd.type.load1.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.load2": "non-standard.simd.type.load2.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.load3": "non-standard.simd.type.load3.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%floatType%.max": "non-standard.simd.floatType.max.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%floatType%.maxNum": "non-standard.simd.floatType.maxNum.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%floatType%.min": "non-standard.simd.floatType.min.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%floatType%.minNum": "non-standard.simd.floatType.minNum.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.neg": "non-standard.simd.type.neg.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.not": "non-standard.simd.type.not.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.notEqual": "non-standard.simd.type.notEqual.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.or": "non-standard.simd.type.or.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%floatType%.reciprocalApproximation": "non-standard.simd.floatType.reciprocalApproximation.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%floatType%.reciprocalSqrtApproximation": "non-standard.simd.floatType.reciprocalSqrtApproximation.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.replaceLane": "non-standard.simd.type.replaceLane.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.select": "non-standard.simd.type.select.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%integerType%.shiftLeftByScalar": "non-standard.simd.integerType.shiftLeftByScalar.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%integerType%.shiftRightByScalar": "non-standard.simd.integerType.shiftRightByScalar.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.shuffle": "non-standard.simd.type.shuffle.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.splat": "non-standard.simd.type.splat.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%floatType%.sqrt": "non-standard.simd.floatType.sqrt.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.store": "non-standard.simd.type.store.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.store1": "non-standard.simd.type.store1.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.store2": "non-standard.simd.type.store2.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.store3": "non-standard.simd.type.store3.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.sub": "non-standard.simd.type.sub.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%integerType%.subSaturate": "non-standard.simd.integerType.subSaturate.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.swizzle": "non-standard.simd.type.swizzle.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.xor": "non-standard.simd.type.xor.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.fromTIMDBits": "non-standard.simd.type.fromTIMDBits.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.fromTIMD": "non-standard.simd.type.fromTIMD.js",
  "Non-standard > decompilation > uneval, existence": "non-standard.decompilation.uneval.js",
  "Non-standard > decompilation > built-in \"toSource\" methods": "non-standard.decompilation.toSource.js",
  "Non-standard > decompilation > \"toSource\" method as hook for uneval": "non-standard.decompilation.toSource-hook.js",
  "Non-standard > decompilation > eval(uneval(value)) is functionally equivalent to value": "non-standard.decompilation.eval-uneval-equivalent.js",
  "Non-standard > optional \"scope\" argument of \"eval\"": "non-standard.eval.scope-argument.js",
  "Non-standard > function \"caller\" property": "non-standard.function.caller.js",
  "Non-standard > function \"arity\" property": "non-standard.function.arity.js",
  "Non-standard > function \"arguments\" property": "non-standard.function.arguments.js",
  "Non-standard > Function.prototype.isGenerator": "non-standard.Function.prototype.isGenerator.js",
  "Non-standard > class extends null": "non-standard.class-extends-null.js",
  "Non-standard > __count__": "non-standard.__count__.js",
  "Non-standard > __parent__": "non-standard.__parent__.js",
  "Non-standard > __noSuchMethod__": "non-standard.__noSuchMethod__.js",
  "Non-standard > Array generics": "non-standard.Array.generics.js",
  "Non-standard > String generics": "non-standard.String.generics.js",
  "Non-standard > Array comprehensions (JS 1.8 style)": "non-standard.array-comprehensions.js18.js",
  "Non-standard > Array comprehensions (ES draft style) (medium)": "non-standard.array-comprehensions.es-draft.js",
  "Non-standard > Expression closures": "non-standard.expression-closures.js",
  "Non-standard > ECMAScript for XML (E4X)": "non-standard.e4x.js",
  "Non-standard > \"for each..in\" loops": "non-standard.for-each-in.js",
  "Non-standard > Sharp variables": "non-standard.sharp-variables.js",
  "Non-standard > Iterator": "non-standard.Iterator.js",
  "Non-standard > __iterator__": "non-standard.__iterator__.js",
  "Non-standard > Generators (JS 1.8)": "non-standard.generators.js18.js",
  "Non-standard > Generator comprehensions (JS 1.8 style)": "non-standard.generator-comprehensions.js18.js",
  "Non-standard > Generator comprehensions (ES draft style) (medium)": "non-standard.generator-comprehensions.es-draft.js",
  "Non-standard > RegExp \"x\" flag": "non-standard.RegExp.x-flag.js",
  "Non-standard > Callable RegExp": "non-standard.RegExp.callable.js",
  "Non-standard > RegExp named groups": "non-standard.RegExp.named-groups.js",
  "Non-standard > String.prototype.quote": "non-standard.String.prototype.quote.js",
  "Non-standard > String.prototype.replace flags": "non-standard.String.prototype.replace.flags.js",
  "Non-standard > Date.prototype.toLocaleFormat": "non-standard.Date.prototype.toLocaleFormat.js",
  "Non-standard > Date.parse produces NaN for invalid dates": "non-standard.Date.parse.NaN-invalid.js",
  "Non-standard > Object.prototype.watch": "non-standard.Object.prototype.watch.js",
  "Non-standard > Object.prototype.unwatch": "non-standard.Object.prototype.unwatch.js",
  "Non-standard > Object.prototype.eval": "non-standard.Object.prototype.eval.js",
  "Non-standard > Object.observe": "non-standard.Object.observe.js",
  "Non-standard > error \"stack\"": "non-standard.error.stack.js",
  "Non-standard > error \"lineNumber\"": "non-standard.error.lineNumber.js",
  "Non-standard > error \"columnNumber\"": "non-standard.error.columnNumber.js",
  "Non-standard > error \"fileName\"": "non-standard.error.fileName.js",
  "Non-standard > error \"description\"": "non-standard.error.description.js",
  "Non-standard > global > \"global\" global property is global object": "non-standard.global.is-global-object.js",
  "Non-standard > global > \"global\" global property has correct property descriptor": "non-standard.global.descriptor.js",
  "Non-standard > Proxy \"ownKeys\" handler, duplicate keys for non-extensible targets (ES 2017 semantics)": "non-standard.Proxy.ownKeys-duplicate-keys-es2017.js"
*/
