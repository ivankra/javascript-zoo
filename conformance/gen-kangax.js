#!/usr/bin/env node
// Generates kangax-*/*.js tests from compat-table's data-*.js files.
//
// * ./gen-kangax.js parse
//   Parses compat-table and generated tests, creates/updates gen-kangax.json
//   with title => filename mapping and parsed compat-table tests.
//
// * ./gen-kangax.js gen
//   Generates test files
//
// * ./gen-kangax.js gen --clean
//   Removes generated files. Useful for renaming, upstream updates, etc.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

const fs = require('fs');
const path = require('path');

const PROCESSED_FILE = 'gen-kangax.json'

const COMPAT_TABLE_ROOT = '../third_party/compat-table'

const DATA_FILES = [
  'data-es5.js',
  'data-es6.js',
  'data-es2016plus.js',
  'data-esintl.js',
  'data-esnext.js',
  //'data-non-standard.js'
];

// Will be skipped during 'gen' and 'gen --clean'
const EDITED_TESTS = [
  'kangax-es2023/hashbang.js',
  'kangax-es2024/regex.flags.v.unicode-17.0.js',
  'kangax-es6/typed-arrays.correct-prototype-chains.js',
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

function doParse() {
  const map = {};
  const processedData = {};

  for (const dataFilename of DATA_FILES) {
    const dataPath = COMPAT_TABLE_ROOT + '/' + dataFilename;

    if (!fs.existsSync(dataPath)) {
      console.error(`Error: Input file not found: ${dataPath}`);
      process.exit(1);
    }

    const data = require(path.resolve(dataPath));

    processedData[data.name] = processTests(data.tests);

    data.tests.forEach(test => {
      const category = test.category ? `${test.category} > ` : '';
      const significance = test.significance ? ` (${test.significance})` : '';

      if (test.subtests) {
        test.subtests.forEach(subtest => {
          const key = `${data.name} > ${category}${test.name}${significance} > ${subtest.name}`;
          map[key] = "";
        });
      } else {
        const key = `${data.name} > ${category}${test.name}${significance}`;
        map[key] = "";
      }
    });
  }

  // Scan all kangax-* directories
  const allDirs = fs.readdirSync('.').filter(name => {
    const stat = fs.statSync(name);
    return stat.isDirectory() && name.startsWith('kangax-');
  });

  for (const dirName of allDirs) {
    const regex = /^.*\.js$/;
    const files = fs.readdirSync(dirName).filter(file => regex.test(file));
    console.log(`${dirName}/*.js: found ${files.length} test files`);

    for (const file of files) {
      const content = fs.readFileSync(`${dirName}/${file}`, 'utf-8');
      const lines = content.split('\n');

      const compatLine = lines.find(line => line.trim().startsWith('// compat-table:'));
      if (compatLine) {
        const key = compatLine.replace(/^\/\/\s*compat-table:\s*/, '').trim();

        if (!(key in map)) {
          console.warn(`"${key}" (${file}): not in input data files, skipping`);
          continue;
        }

        if (map[key] === '') {
          map[key] = `${dirName}/${file}`;
        } else {
          console.warn(`"${key}": duplicated in ${map[key]} and ${dirName}/${file}`);
        }
      }
    }
  }

  const processedJson = {
    'map': map,
    'tests': processedData,
  };

  fs.writeFileSync(PROCESSED_FILE, JSON.stringify(processedJson, null, 2));
  console.log(`Generated ${PROCESSED_FILE}`);
}

function doGen(cleanMode) {
  const processedJson = require(path.resolve(PROCESSED_FILE));
  const allTests = [];

  for (const suite in processedJson.tests) {
    processedJson.tests[suite].forEach(test => {
      const category = test.category ? `${test.category} > ` : '';
      const significance = test.significance ? ` (${test.significance})` : '';

      if (test.subtests) {
        test.subtests.forEach(subtest => {
          allTests.push({
            key: `${suite} > ${category}${test.name}${significance} > ${subtest.name}`,
            spec: subtest.spec || test.spec,
            mdn: subtest.mdn || test.mdn,
            exec: subtest.exec,
            note_html: subtest.note_html
          });
        });
      } else {
        allTests.push({
          key: `${suite} > ${category}${test.name}${significance}`,
          spec: test.spec,
          mdn: test.mdn,
          exec: test.exec,
          note_html: test.note_html
        });
      }
    });
  }

  let generated = 0;
  let skipped = 0;

  for (const item of allTests) {
    const filename = processedJson.map[item.key];

    if (!filename) {
      console.error(`No filename mapping for key: ${item.key}`);
      skipped++;
      continue;
    }

    if (!item.exec) {
      console.error(`No exec code for: ${item.key}`);
      skipped++;
      continue;
    }

    if (Array.isArray(item.exec)) {
      console.warn(`Warning: Skipping array exec for: ${item.key}`);
      skipped++;
      continue;
    }

    const notes = [];
    if (item.note_html) {
      notes.push(item.note_html.replace(/<[^>]+>/g, ''));
    }

    if (EDITED_TESTS.indexOf(filename) !== -1 && fs.existsSync(filename)) {
      console.log(`Skipping edited file: ${filename}`);
      skipped++;
    } else if (cleanMode) {
      if (fs.existsSync(filename)) {
        fs.unlinkSync(filename);
        console.log(`Deleted ${filename}`);
        generated++;
      }
    } else {
      genTest(
        item.key,
        filename,
        item.spec,
        item.mdn,
        item.exec,
        notes
      );
      generated++;
    }
  }
}

function genTest(compatKey, filename, spec, mdn, evalcode, notes) {
  let header = `// compat-table: ${compatKey}\n`;
  if (mdn) {
    header += `// mdn: ${mdn}\n`;
  }
  if (spec) {
    header += `// spec: ${spec}\n`;
  }

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

  // Two space indent except for one indent-sensitive test
  if (compatKey !== 'ES6 > syntax > template literals (large) > basic functionality') {
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
  console.log("${filename}: exception: " + e);
}
`;
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
  console.log("${filename}: exception: " + e);
}
`;
  } else {
    script += `
function testCode() {
${evalcode}
}

try {
  if (testCode()) {
    console.log("${filename}: OK");
  } else {
    console.log("${filename}: failed");
  }
} catch (e) {
  console.log("${filename}: exception: " + e);
}
`;
  }

  const dir = path.dirname(filename);
  if (dir !== '.' && !fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filename, script);
  console.log(`Generated ${filename}`);
}

function main() {
  const args = process.argv.slice(2);
  const operation = args[0] ?? '';
  if (operation === 'parse') {
    doParse();
  } else if (operation === 'gen') {
    let cleanMode = args[1] === "--clean";
    doGen(cleanMode);
  } else if (operation === '') {
    doParse();
    doGen(false);
  } else {
    console.log(`Unknown operation ${operation}`);
  }
}

main()

/*
  "Non-standard > SIMD (Single Instruction, Multiple Data) > basic support": "kangax-non-standard/simd.basic.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > Float32x4": "kangax-non-standard/simd.Float32x4.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > Int32x4": "kangax-non-standard/simd.Int32x4.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > Int16x8": "kangax-non-standard/simd.Int16x8.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > Int8x16": "kangax-non-standard/simd.Int8x16.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > Uint32x4": "kangax-non-standard/simd.Uint32x4.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > Uint16x8": "kangax-non-standard/simd.Uint16x8.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > Uint8x16": "kangax-non-standard/simd.Uint8x16.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > Bool32x4": "kangax-non-standard/simd.Bool32x4.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > Bool16x8": "kangax-non-standard/simd.Bool16x8.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > Bool8x16": "kangax-non-standard/simd.Bool8x16.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%floatType%.abs": "kangax-non-standard/simd.floatType.abs.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.add": "kangax-non-standard/simd.type.add.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%integerType%.addSaturate": "kangax-non-standard/simd.integerType.addSaturate.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.and": "kangax-non-standard/simd.type.and.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%booleanType%.anyTrue": "kangax-non-standard/simd.booleanType.anyTrue.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%booleanType%.allTrue": "kangax-non-standard/simd.booleanType.allTrue.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.check": "kangax-non-standard/simd.type.check.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.equal": "kangax-non-standard/simd.type.equal.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.extractLane": "kangax-non-standard/simd.type.extractLane.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.greaterThan": "kangax-non-standard/simd.type.greaterThan.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.greaterThanOrEqual": "kangax-non-standard/simd.type.greaterThanOrEqual.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.lessThan": "kangax-non-standard/simd.type.lessThan.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.lessThanOrEqual": "kangax-non-standard/simd.type.lessThanOrEqual.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.mul": "kangax-non-standard/simd.type.mul.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%floatType%.div": "kangax-non-standard/simd.floatType.div.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.load": "kangax-non-standard/simd.type.load.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.load1": "kangax-non-standard/simd.type.load1.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.load2": "kangax-non-standard/simd.type.load2.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.load3": "kangax-non-standard/simd.type.load3.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%floatType%.max": "kangax-non-standard/simd.floatType.max.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%floatType%.maxNum": "kangax-non-standard/simd.floatType.maxNum.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%floatType%.min": "kangax-non-standard/simd.floatType.min.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%floatType%.minNum": "kangax-non-standard/simd.floatType.minNum.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.neg": "kangax-non-standard/simd.type.neg.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.not": "kangax-non-standard/simd.type.not.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.notEqual": "kangax-non-standard/simd.type.notEqual.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.or": "kangax-non-standard/simd.type.or.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%floatType%.reciprocalApproximation": "kangax-non-standard/simd.floatType.reciprocalApproximation.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%floatType%.reciprocalSqrtApproximation": "kangax-non-standard/simd.floatType.reciprocalSqrtApproximation.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.replaceLane": "kangax-non-standard/simd.type.replaceLane.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.select": "kangax-non-standard/simd.type.select.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%integerType%.shiftLeftByScalar": "kangax-non-standard/simd.integerType.shiftLeftByScalar.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%integerType%.shiftRightByScalar": "kangax-non-standard/simd.integerType.shiftRightByScalar.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.shuffle": "kangax-non-standard/simd.type.shuffle.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.splat": "kangax-non-standard/simd.type.splat.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%floatType%.sqrt": "kangax-non-standard/simd.floatType.sqrt.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.store": "kangax-non-standard/simd.type.store.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.store1": "kangax-non-standard/simd.type.store1.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.store2": "kangax-non-standard/simd.type.store2.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.store3": "kangax-non-standard/simd.type.store3.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.sub": "kangax-non-standard/simd.type.sub.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%integerType%.subSaturate": "kangax-non-standard/simd.integerType.subSaturate.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.swizzle": "kangax-non-standard/simd.type.swizzle.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.xor": "kangax-non-standard/simd.type.xor.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.fromTIMDBits": "kangax-non-standard/simd.type.fromTIMDBits.js",
  "Non-standard > SIMD (Single Instruction, Multiple Data) > SIMD.%type%.fromTIMD": "kangax-non-standard/simd.type.fromTIMD.js",
  "Non-standard > decompilation > uneval, existence": "kangax-non-standard/decompilation.uneval.js",
  "Non-standard > decompilation > built-in \"toSource\" methods": "kangax-non-standard/decompilation.toSource.js",
  "Non-standard > decompilation > \"toSource\" method as hook for uneval": "kangax-non-standard/decompilation.toSource-hook.js",
  "Non-standard > decompilation > eval(uneval(value)) is functionally equivalent to value": "kangax-non-standard/decompilation.eval-uneval-equivalent.js",
  "Non-standard > optional \"scope\" argument of \"eval\"": "kangax-non-standard/eval.scope-argument.js",
  "Non-standard > function \"caller\" property": "kangax-non-standard/function.caller.js",
  "Non-standard > function \"arity\" property": "kangax-non-standard/function.arity.js",
  "Non-standard > function \"arguments\" property": "kangax-non-standard/function.arguments.js",
  "Non-standard > Function.prototype.isGenerator": "kangax-non-standard/Function.prototype.isGenerator.js",
  "Non-standard > class extends null": "kangax-non-standard/class-extends-null.js",
  "Non-standard > __count__": "kangax-non-standard/__count__.js",
  "Non-standard > __parent__": "kangax-non-standard/__parent__.js",
  "Non-standard > __noSuchMethod__": "kangax-non-standard/__noSuchMethod__.js",
  "Non-standard > Array generics": "kangax-non-standard/Array.generics.js",
  "Non-standard > String generics": "kangax-non-standard/String.generics.js",
  "Non-standard > Array comprehensions (JS 1.8 style)": "kangax-non-standard/array-comprehensions.js18.js",
  "Non-standard > Array comprehensions (ES draft style) (medium)": "kangax-non-standard/array-comprehensions.es-draft.js",
  "Non-standard > Expression closures": "kangax-non-standard/expression-closures.js",
  "Non-standard > ECMAScript for XML (E4X)": "kangax-non-standard/e4x.js",
  "Non-standard > \"for each..in\" loops": "kangax-non-standard/for-each-in.js",
  "Non-standard > Sharp variables": "kangax-non-standard/sharp-variables.js",
  "Non-standard > Iterator": "kangax-non-standard/Iterator.js",
  "Non-standard > __iterator__": "kangax-non-standard/__iterator__.js",
  "Non-standard > Generators (JS 1.8)": "kangax-non-standard/generators.js18.js",
  "Non-standard > Generator comprehensions (JS 1.8 style)": "kangax-non-standard/generator-comprehensions.js18.js",
  "Non-standard > Generator comprehensions (ES draft style) (medium)": "kangax-non-standard/generator-comprehensions.es-draft.js",
  "Non-standard > RegExp \"x\" flag": "kangax-non-standard/RegExp.x-flag.js",
  "Non-standard > Callable RegExp": "kangax-non-standard/RegExp.callable.js",
  "Non-standard > RegExp named groups": "kangax-non-standard/RegExp.named-groups.js",
  "Non-standard > String.prototype.quote": "kangax-non-standard/String.prototype.quote.js",
  "Non-standard > String.prototype.replace flags": "kangax-non-standard/String.prototype.replace.flags.js",
  "Non-standard > Date.prototype.toLocaleFormat": "kangax-non-standard/Date.prototype.toLocaleFormat.js",
  "Non-standard > Date.parse produces NaN for invalid dates": "kangax-non-standard/Date.parse.NaN-invalid.js",
  "Non-standard > Object.prototype.watch": "kangax-non-standard/Object.prototype.watch.js",
  "Non-standard > Object.prototype.unwatch": "kangax-non-standard/Object.prototype.unwatch.js",
  "Non-standard > Object.prototype.eval": "kangax-non-standard/Object.prototype.eval.js",
  "Non-standard > Object.observe": "kangax-non-standard/Object.observe.js",
  "Non-standard > error \"stack\"": "kangax-non-standard/error.stack.js",
  "Non-standard > error \"lineNumber\"": "kangax-non-standard/error.lineNumber.js",
  "Non-standard > error \"columnNumber\"": "kangax-non-standard/error.columnNumber.js",
  "Non-standard > error \"fileName\"": "kangax-non-standard/error.fileName.js",
  "Non-standard > error \"description\"": "kangax-non-standard/error.description.js",
  "Non-standard > global > \"global\" global property is global object": "kangax-non-standard/global.is-global-object.js",
  "Non-standard > global > \"global\" global property has correct property descriptor": "kangax-non-standard/global.descriptor.js",
  "Non-standard > Proxy \"ownKeys\" handler, duplicate keys for non-extensible targets (ES 2017 semantics)": "kangax-non-standard/Proxy.ownKeys-duplicate-keys-es2017.js"
*/
