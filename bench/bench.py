#!/usr/bin/env python3
# Basic usage:
#   ./bench.py binary [test.js ...]
#
# Conceptually, runs './binary test.js' on each test multiple times,
# manages quirks of different engines, default set of benchmarks,
# parses errors and test results.

import argparse
import glob
import json
import os
import re
import shlex
import shutil
import signal
import subprocess
import sys
import tempfile
import time
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Callable, Dict, List, Optional, Union

OCTANE_TESTS = [
   'richards.js',
   'deltablue.js',
   'crypto.js',
   'raytrace.js',
   'earley-boyer.js',
   'regexp.js',
   'splay.js',
   'navier-stokes.js',
   'pdfjs.js',
   'mandreel.js',
   'gbemu.js',
   'code-load.js',
   'box2d.js',
   'zlib.js',
   'typescript.js',
]

PRINT_PF = '''
  if (typeof print == "undefined" && typeof "console" != "undefined") {
    if (typeof globalThis != "undefined") globalThis.print = console.log;
    else print = console.log;
  }
'''

ES5_FOR_ES3_PF = '''
  if (typeof Array.prototype.indexOf === "undefined") {
    Array.prototype.indexOf = function(x, i) {
      for (i = i || 0; i < this.length; i++) if (this[i] === x) return i;
      return -1;
    };
  }
  if (typeof Array.prototype.map === "undefined") {
    Array.prototype.map = function(f, t) {
      for (var i = 0, res = []; i < this.length; i++)
        if (i in this) res[i] = f.call(t, this[i], i, this);
      return res;
    };
  }
  if (typeof Object.create === "undefined") {
    Object.create = function(p) { function F() {}; F.prototype = p; return new F(); };
  }
  if (typeof Object.defineProperty === "undefined") {
    Object.defineProperty = function(obj, prop, desc) {
      if (desc.hasOwnProperty('value')) {
        obj[prop] = desc.value;
      } else if (desc.hasOwnProperty('get')) {
        obj[prop] = desc.get.call(obj);
      }
      return obj;
    };
  }
'''

@dataclass
class MemTest:
    """In-memory test case, a single self-contained script."""

    filename: str  # basename
    script: str

def load_test(path: Union[str, Path], drop_loads=False) -> MemTest:
    """Read test case into memory, recursively resolving load() calls."""

    path = Path(path)
    filename = path.name
    lines = []

    for line in open(path):
        m = re.match(r'''^load\((?:base_dir \+ )?('[^']+'|"[^"\\]+")\) *;$''', line.strip());
        if not m:
            lines.append(line)
            continue

        lines.append('// BEGIN ' + line.strip() + '\n')
        if drop_loads:
            continue

        loaded = load_test(path.parent / m[1][1:-1])
        lines.append(loaded.script.strip() + '\n')
        lines.append('// END ' + line.strip() + '\n\n')

    script = ''.join(lines).strip() + '\n'
    return MemTest(filename=filename, script=script)

TestTransform = Callable[[MemTest], Union[str, MemTest]]

class OctaneHarness:
    def __init__(self):
        self._base = None
        self._tail = None

    def __call__(self, test: MemTest) -> MemTest:
        if test.filename not in OCTANE_TESTS:
            return test

        if 'function Benchmark(' in test.script:
            return test

        if self._base is None:
            self._base = open('octane/base.js').read().strip() + '\n'

        if self._tail is None:
            self._tail = open('octane/run.js').read().strip() + '\n'
            self._tail = re.sub(r'load\([^)]+\);', '', self._tail)

        script = self._base + test.script + self._tail
        return MemTest(filename=test.filename, script=script)

class OctalTransform:
    """Fix octal char sequences in earley-boyer.js, "\000" -> "\x00" etc."""

    def __call__(self, test: MemTest) -> MemTest:
        script = re.sub(r'"\\[01]([0-9][0-9])"', self._replace, test.script)
        return MemTest(filename=test.filename, script=script)

    def _replace(self, match: re.Match) -> str:
        return '"\\x%.2X"' % ord(eval(match[0])[0])

class HexTransform:
    """Replace hex literals by decimal."""

    def __call__(self, test: MemTest) -> MemTest:
        script = re.sub(r'''(0x[0-9a-fA-F]+|"(?:[^"\n]|\")+"|'(?:'[^'\n]|\')+')''', self._replace, test.script)
        return MemTest(filename=test.filename, script=script)

    def _replace(self, match: re.Match) -> str:
        if match[0].startswith('0x'):
            return str(eval(match[0]))
        return match[0]

class PolyfillTransform:
    def __init__(self, snippets: List[str]):
        lines = []
        for snippet in snippets:
            for line in snippet.strip().split('\n'):
                lines.append(line.strip())
        self.code = '\n'.join(lines) + '\n'

    def __call__(self, test: MemTest) -> MemTest:
        return MemTest(filename=test.filename, script=self.code + test.script)

class Binary:
    path: Path
    flags: Optional[List[str]]
    metadata: Dict[str, Any]

    def __init__(self, path_and_flags: str):
        self.path = Path(path_and_flags)
        self.flags = None
        self.metadata = {}

        if ' ' in path_and_flags and not self.path.exists():
            args = shlex.split(path_and_flags)
            assert len(args) >= 2
            self.path = Path(args[0])
            self.flags = args[1:]

        if not os.path.exists(self.path):
            raise FileNotFoundError(self.path)

        self.path = Path(os.path.abspath(str(self.path)))

        json_path = self.path.parent / f'{self.path.name}.json'
        if json_path.exists():
            self.metadata = json.load(json_path.open())

    def __str__(self):
        return f'Binary({repr(self.__dict__)})'

@dataclass
class Run:
    temp_dir: Path
    binary: Binary
    test: MemTest
    args: argparse.Namespace
    command: str = ''  # bash command
    output: str = ''   # stdout+stderr combined
    errors: List[str] = field(default_factory=list)
    script_path: Optional[Path] = None
    output_path: Optional[Path] = None
    time_path: Optional[Path] = None
    # Result of subprocess.run() with self.command
    proc: Optional[subprocess.CompletedProcess] = None
    # exit_code..max_rss_kb: as measured by /usr/bin/time
    # Note: exit_code captures exit code of javascript shell itself,
    # vs proc.returncode - exit code of bash command/pipeline
    exit_code: Optional[int] = None
    exit_signal: Optional[int] = None
    user_time: Optional[float] = None  # seconds
    real_time: Optional[float] = None
    sys_time: Optional[float] = None
    max_rss_kb: Optional[int] = None
    scores: Dict[str, Union[int, float]] = field(default_factory=dict)

class Runner:
    # Flags to pass to binary (before script path). binary.flags takes precedence.
    flags: List[str]
    transforms: List[TestTransform]
    polyfills: List[str]
    # Pattern for error lines
    error_lines_re: re.Pattern
    # Pattern for mere warning lines, takes precedence over error_lines_re
    warn_lines_re: Optional[re.Pattern]
    # Pattern for lines to immediately filter out during the run, via egrep
    filter_lines_re: Optional[str]
    timestamp_output: bool
    timeout: float
    # test basename => timeout
    timeout_for_test: Dict[str, float]
    ignore_errors: bool
    benchmark_suite: Optional[List[str]]

    def __init__(
            self,
            flags: List[str] = [],
            polyfills: List[str] = [PRINT_PF],
            transforms: List[TestTransform] = [],
            error_lines_re: str = "(?i)(?:error|exception|uncaught|mismatch|failed|invalid|unsupported|cannot|can't)",
            warn_lines_re: Optional[str] = None,
            filter_lines_re: Optional[str] = None,
            timestamp_output: bool = False,
            timeout: float = 120.,
            timeout_for_test: Dict[str, float] = {},
            ignore_errors: bool = False,
            benchmark_suite: Optional[List[str]] = None,
        ):
        self.flags = list(flags)
        self.transforms = list(transforms)
        if polyfills:
            self.transforms.append(PolyfillTransform(polyfills))
        self.error_lines_re = re.compile(error_lines_re)
        self.warn_lines_re = re.compile(warn_lines_re) if warn_lines_re else None
        self.filter_lines_re = filter_lines_re
        self.timestamp_output = timestamp_output
        self.timeout = timeout
        self.timeout_for_test = timeout_for_test
        self.ignore_errors = ignore_errors
        self.benchmark_suite = benchmark_suite

    def __call__(self, binary: Binary, test: MemTest, args: argparse.Namespace) -> Run:
        test_pref = test.filename.replace('.js', '')
        temp_dir = Path(tempfile.mkdtemp(prefix=f'{binary.path.name}-{test_pref}-'))
        run = Run(temp_dir=temp_dir, binary=binary, test=test, args=args)

        if run.args.timeout:
            run.timeout = run.args.timeout
        else:
            run.timeout = self.timeout_for_test.get(
                os.path.basename(run.test.filename), self.timeout)

        run.output_path = run.temp_dir / 'output'
        run.time_path = run.temp_dir / 'time'

        self.transform_test(run)
        self.save_script(run)
        self.build_command(run)
        self.run_command(run)

        if run.output_path.exists():
            run.output = run.output_path.open().read()

        self.parse_time_output(run)
        self.extract_scores(run)
        self.check_errors(run)

        if run.errors or run.args.keep:
            with open(run.temp_dir / 'run.json', 'w') as fp:
                json.dump(run.__dict__, indent=2, fp=fp, default=repr)
        else:
            shutil.rmtree(run.temp_dir)

        return run

    def transform_test(self, run: Run):
        test = run.test
        for f in self.transforms:
            res = f(test)
            if type(res) is MemTest:
                test = res
            else:
                assert type(res) is str
                test = MemTest(filename=test.filename, script=res)
        run.test = test

    def save_script(self, run: Run):
        run.script_path = run.temp_dir / run.test.filename
        with open(run.script_path, 'w') as f:
            f.write(run.test.script)
        run.test.script = None

    def build_command(self, run: Run):
        run.command = shlex.join(['cd', run.temp_dir.as_posix()])
        run.command += '; ' + shlex.join(
            ['stdbuf', '-oL', '-eL'] +
            ['/usr/bin/time', '-v', '-o', 'time'] +
            [run.binary.path.as_posix()] +
            (run.binary.flags if run.binary.flags else self.flags) +
            [run.script_path.name]
        ) + ' 2>&1'
        if self.timestamp_output:
            # Prefix output lines with time relative to start, n.nnnnnn
            run.command += ' | ts -s %.s'
        if self.filter_lines_re:
            run.command += ' | ' + shlex.join(['egrep', '-v', '-e', self.filter_lines_re])
        run.command += ' | tee output'

    def run_command(self, run: Run):
        print(f'Running: {run.command}', flush=True)
        try:
            run.proc = subprocess.run(
                ['/bin/bash', '-e', '-o', 'pipefail', '-c', run.command],
                timeout=run.timeout
            )
        except subprocess.TimeoutExpired:
            run.errors.append('Timeout (%0.fs)' % run.timeout)

    def parse_time_output(self, run: Run):
        """Parse the output of /usr/bin/time -v"""

        assert run.time_path.exists()

        keymap = {
            'User time (seconds)': 'user_time',
            'System time (seconds)': 'sys_time',
            'Elapsed (wall clock) time (h:mm:ss or m:ss)': 'real_time',
            'Maximum resident set size (kbytes)': 'max_rss_kb',
            'Exit status': 'exit_code',
        }

        for line in run.time_path.open():
            m = re.match('^Command terminated by signal ([0-9]+)$', line)
            if m:
                run.exit_signal = int(m[1])
                continue

            if not line.startswith('\t'):
                continue

            assert ': ' in line, line
            key, val = line.strip().split(': ', 1)

            if key not in keymap:
                continue

            if ':' in val:
                secs = 0
                for s in val.split(':'):
                    secs = secs * 60 + float(s)
                val = secs
            elif '.' in val:
                val = float(val)
            else:
                val = int(val)

            setattr(run, keymap[key], val)

    def extract_scores(self, run):
        matches = re.findall(r'([A-Zz][a-zA-Z0-9]+|Score [(]version .[)]): ([-+.e0-9]+)', run.output)
        run.scores = {}
        for name, score in matches:
            if name == 'LEAK': continue  # KJS
            name = name.replace(' (version ', 'V').replace(')', '')
            try:
                score = int(score)
            except:
                try:
                    score = float(score)
                except:
                    continue
                score = round(score, 3)
            run.scores[name] = score

    def check_errors(self, run: Run):
        for line in run.output.split('\n'):
            if self.warn_lines_re and re.search(self.warn_lines_re, line):
                continue
            m = re.search(self.error_lines_re, line)
            if m is None:
                continue
            run.errors.append(line)
            break

        if run.exit_signal == 9 and run.max_rss_kb >= 50 * 1048576:
            run.errors.append('OOM (>%.0fG)' % (run.max_rss_kb / 1048576.))
        elif run.exit_signal is not None:
            try:
                signame = signal.Signals(run.exit_signal).name
                run.errors.append(f'Killed by signal {run.exit_signal} ({signame})')
            except:
                run.errors.append(f'Killed by signal {run.exit_signal}')

        if not run.errors:
            if run.output.strip() == '':
                run.errors.append('No output')
            elif not run.scores:
                run.errors.append('No scores in the output')
            elif run.exit_code != 0:
                run.errors.append(f'Exit code: {run.exit_code}')
            elif run.proc.returncode != 0:  # of bash command
                run.errors.append(f'Command "{run.command}" exited with {run.proc.returncode}')

RUNNERS = {
  'boa': Runner(timeout_for_test={'zlib.js': 900}),
  'besen': Runner(
      # too slow on other tests or crashes
      benchmark_suite=['richards.js', 'crypto.js', 'deltablue.js', 'navier-stokes.js'],
      ignore_errors=True,
  ),
  'castl': Runner(error_lines_re='(?i)(error|unsupported|200 local variables)'),
  # too slow on other tests
  'cesanta-v7': Runner(benchmark_suite=['richards.js']),
  'dmdscript': Runner(polyfills=[ES5_FOR_ES3_PF]),
  'echosoar-jsi': Runner(transforms=[HexTransform()]),
  'goja': Runner(timeout_for_test={'zlib.js': 900}),
  'hermes': Runner(flags=['-O'], warn_lines_re=r"(warning:|error\('Incorrect|throw 'Unsupported)"),
  # splay.js: can pass if built with --mem-heap=65536, but is extremely slow: Splay 0.279, SplayLatency 1.50
  'jerryscript': Runner(timeout_for_test={'typescript.js': 300}),
  'js-interpreter': Runner(timeout=900),
  'kiesel': Runner(
      # ASI bug triggered in gbemu-part2.js
      transforms=[lambda test: test.script.replace('this.RTCHours -= 24\n', 'this.RTCHours -= 24;\n')],
  ),
  # JS1.1≈ES1 engine
  'mocha': Runner(benchmark_suite=['richards.es1.js']),
  # prototype-based inheritance not working, need to be fixed
  'narcissus': Runner(benchmark_suite=['richards.js1.js']),
  'nashorn': Runner(flags=['--language=es6']),
  'nashorn_ot': Runner(flags=['--language=es6', '-ot']),
  'njs': Runner(
      polyfills=[
          'var result;',  # earley-boyer.js
          'var setupEngine, nValue, eValue, dValue, pValue, qValue, dmp1Value, dmq1Value, coeffValue;',  # crypto.js
          'var Mandreel_timeouts, Mandreel_XMLHttpRequest, Mandreel_document, Mandreel_window;',  # mandreel.js
      ],
      transforms=[OctalTransform()],
  ),
  'nova': Runner(
      flags=['eval'],
      polyfills=[
          'var setupEngine, nValue, eValue, dValue, pValue, qValue, dmp1Value, dmq1Value, coeffValue;',  # crypto.js
      ],
      transforms=[OctalTransform()],
  ),
  'porffor': Runner(
      benchmark_suite=['richards.porffor.js'],  # can't deal with standard test harness, various bugs/limitations
      polyfills=['var print=console.log;'],     # print() defined but unusable
  ),
  # not capable of ES1, no Date()
  'quad-wheel': Runner(benchmark_suite=['richards.quad-wheel.js'], polyfills=[], timestamp_output=True),
  'quickjs-ng': Runner(
      # Buggy, many bugs exposed when run on individual tests vs combined
      polyfills=[
          'var alert=print;',
          'var setupEngine, nValue, eValue, dValue, pValue, qValue, dmp1Value, dmq1Value, coeffValue;',  # crypto.js
      ],
      transforms=[
          # Loses 'this' in checkResult() in navier-stokes.js
          lambda test: test.script.replace(
              '\nfunction checkResult(dens) {\n',
              '\nfunction checkResult(dens) { if (typeof this === "undefined") return new checkResult(dens);\n'
          ),
      ],
      # TODO Gameboy, Mandreel, CodeLoad fail when run separately
  ),
  'qv4': Runner(transforms=[OctalTransform()], filter_lines_re=r'qt\.qml\.usedbeforedeclared:'),
  'sablejs': Runner(warn_lines_re=r'\[WARN\]'),
  'spidermonkey_1.5': Runner(polyfills=[ES5_FOR_ES3_PF]),
  'spidermonkey_1.6': Runner(polyfills=[ES5_FOR_ES3_PF]),
  'spidermonkey_1.7': Runner(polyfills=[ES5_FOR_ES3_PF]),
  'spidermonkey_1.8.0': Runner(polyfills=[ES5_FOR_ES3_PF]),
  'spidermonkey_1.8.5': Runner(flags=['-jm']),  # enable TraceMonkey + method JIT
  'spidermonkey_17': Runner(flags=['-m']),      # enable JIT. Enabled by default in 24+.
  # not capable of ES1
  'starlight': Runner(benchmark_suite=['richards.js1.js']),
  # not capable of ES1, no Date()
  'tiny-js': Runner(benchmark_suite=['richards.tiny-js.js'], polyfills=[], timestamp_output=True),
  # own javascript dialect
  'ucode': Runner(benchmark_suite=['richards.ucode.js'], polyfills=[]),
}

def pick_runner(args, binary):
    for name in [args.variant, binary.path.name, binary.metadata.get('engine')]:
        if name:
            if name in RUNNERS:
                return RUNNERS[name]

            engine = name.split('_')[0]
            if engine in RUNNERS:
                return RUNNERS[engine]

    return Runner()

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-k', '--keep', action='store_true', help='Keep temp dir')
    parser.add_argument('-o', '--output', help='Write benchmark results here as json')
    parser.add_argument('-r', '--reps', type=int, metavar='repetitions')
    parser.add_argument('-t', '--timeout', type=int, metavar='seconds')
    parser.add_argument('-v', '--variant', help='Runner variant to use, "engine[_variant]"')
    parser.add_argument('binary', help='Binary to execute, optionally with flags')
    parser.add_argument('tests', nargs='*', help='Test files to run')
    args = parser.parse_args()

    binary = Binary(args.binary)
    runner = pick_runner(args, binary)
    if args.tests:
        test_files = args.tests
    elif runner.benchmark_suite:
        test_files = runner.benchmark_suite
    else:
        test_files = OCTANE_TESTS

    for filename in test_files:
        path = os.path.join(os.path.dirname(os.path.abspath(__file__)), filename)
        test = load_test(path)
        run = runner(binary, test, args)
        if run.errors:
            print('Errors: ' + str(run.errors))
        if run.scores:
            print('Scores: ' + str(run.scores))
        if run.max_rss_kb:
            print('real/user/sys/rss: %.2f %.2f %.2f %.0fM' % (run.real_time, run.user_time, run.sys_time, run.max_rss_kb/1024.0))
        print()
        sys.stdout.flush()

if __name__ == '__main__':
    main()
