#!/usr/bin/env python3
# GitHub CI benchmark driver for javascript-zoo.
#
# Design:
#   The benchmark workflow (bench.yml) launches 100 parallel shard jobs per
#   arch (amd64 + arm64), each running on a separate GitHub Actions runner.
#   Because GitHub's runners have varying CPU performance, repeating the same
#   test on the same runner is less valuable than spreading runs across the
#   fleet. The sharding strategy maximises coverage and diversity:
#
#   1. Mandatory phase (`run`): all (binary, test) combos are sorted and
#      striped across shards — shard N gets every 100th combo starting at
#      index N-1. This guarantees every combo is benchmarked at least once,
#      on a different runner, within a single workflow run.
#
#   2. Sampling phase (`sample`): each shard fills its time budget by drawing
#      weighted random (binary, test) pairs from the full combo list.
#      Different shards use different RNG seeds so their sampling is diverse.
#      Weights are derived from historical results (bench/{amd64,arm64}/*.json):
#      faster engines and v8-v7 tests are sampled more often, giving a
#      better-averaged leaderboard signal.
#
#   3. Merge: after all shards finish, per-engine JSON results are downloaded
#      and merged (score arrays concatenated) into final per-arch output files.
#
# Usage:
#   github-bench.py gen                        Analyze bench/{amd64,arm64}/*.json, write github-bench.csv with sampling weights
#   github-bench.py run --index N [options]    Run mandatory combos for shard N (no time limit)
#   github-bench.py sample [options]            Random weighted sampling to fill time budget
#   github-bench.py merge <dirs...> <output>    Merge per-shard artifact dirs into per-engine output files

from __future__ import annotations
import argparse, csv, importlib.machinery, json, math, platform, random, re, subprocess, sys, time
from pathlib import Path

BENCH_DIR   = Path(__file__).resolve().parent
ROOT_DIR    = BENCH_DIR.parent
CSV_PATH    = BENCH_DIR / 'github-bench.csv'
NUM_SHARDS  = 100
TIME_LIMIT   = 1800  # seconds per shard job (~30 min)
TEST_TIMEOUT = 1800  # seconds per individual test run

V8_V7_TESTS = {
    'richards.js', 'deltablue.js', 'crypto.js', 'raytrace.js',
    'earley-boyer.js', 'regexp.js', 'splay.js', 'navier-stokes.js',
}

# Mapping from test filename to benchmark suite name(s) in bench JSON output.
# *Latency variants are intentionally excluded.
TEST_BENCHMARKS = {
    'richards.js':            ['Richards'],
    'richards.es1.js':        ['Richards'],
    'richards.js1.js':        ['Richards'],
    'richards.tiny-js.js':    ['Richards'],
    'richards.porffor.js':    ['Richards'],
    'richards.quad-wheel.js': ['Richards'],
    'richards.quanta.js':     ['Richards'],
    'richards.rapidus.js':    ['Richards'],
    'richards.ucode.js':      ['Richards'],
    'deltablue.js':           ['DeltaBlue'],
    'crypto.js':              ['Crypto'],
    'raytrace.js':            ['RayTrace'],
    'earley-boyer.js':        ['EarleyBoyer'],
    'regexp.js':              ['RegExp'],
    'splay.js':               ['Splay'],
    'navier-stokes.js':       ['NavierStokes'],
    'pdfjs.js':               ['PdfJS'],
    'mandreel.js':            ['Mandreel'],
    'gbemu.js':               ['Gameboy'],
    'code-load.js':           ['CodeLoad'],
    'box2d.js':               ['Box2D'],
    'zlib.js':                ['zlib'],
    'typescript.js':          ['Typescript'],
}

# Reverse map: benchmark name -> test filename (derived from TEST_BENCHMARKS)
BENCHMARK_TEST = {b: t for t, bmarks in TEST_BENCHMARKS.items() for b in bmarks}


def load_bench():
    loader = importlib.machinery.SourceFileLoader('bench', str(BENCH_DIR / 'bench'))
    return loader.load_module()


def engine_tests(engine, bench):
    base = engine.split('_')[0]
    for name in [engine, base]:
        cfg = bench.CONFIGS.get(name)
        if cfg and cfg.benchmark_suite:
            return cfg.benchmark_suite
    return bench.OCTANE_TESTS


def all_combos(bench):
    """Sorted list of (engine, test) from /dist/LIST."""
    engines = [l.strip() for l in open('/dist/LIST') if l.strip()]
    return sorted((e, t) for e in engines for t in engine_tests(e, bench))


def detect_arch():
    return {'x86_64': 'amd64', 'aarch64': 'arm64'}.get(platform.machine(), platform.machine())


def load_weights(arch):
    """Load (engine, test) -> weight for the given arch from CSV; empty dict if no CSV."""
    if not CSV_PATH.exists():
        return {}
    with open(CSV_PATH) as f:
        return {(r['binary'], r['test']): float(r['weight'])
                for r in csv.DictReader(f) if r['arch'] == arch}


# ---------------------------------------------------------------------------
# no-args: generate CSV from historical bench data
# ---------------------------------------------------------------------------

def cmd_gen(args):
    # Collect scores per (arch, engine, test) from historical bench JSONs.
    scores = {}  # (arch, engine, test) -> [score, ...]
    errors = set()  # (arch, engine, test) combos that had errors
    for arch in ['amd64', 'arm64']:
        for f in sorted((ROOT_DIR / 'bench' / arch).glob('*.json')):
            try:
                d = json.loads(f.read_text())
            except Exception:
                continue
            engine = f.stem
            for key, val in d.get('benchmarks', {}).items():
                if key.endswith('Latency'):
                    continue
                test = BENCHMARK_TEST.get(key)
                if test is None:
                    continue
                if val.get('error'):
                    errors.add((arch, engine, test))
                good = [v for v in (val.get('score') or []) if v and v > 0]
                if good:
                    scores.setdefault((arch, engine, test), []).extend(good)

    rows = []
    for key in sorted(scores.keys() | errors):
        arch, engine, test = key
        if key in errors:
            weight = 0
        else:
            vals = scores[key]
            gm = math.exp(sum(math.log(v) for v in vals) / len(vals))
            v8v7_factor = 2.0 if test in V8_V7_TESTS else 1.0
            zlib_factor = 1/2 if test == 'zlib.js' else 1.0
            weight = round((min(gm, 30000) / 100) ** 0.4 * v8v7_factor * zlib_factor, 4)
        rows.append({'arch': arch, 'binary': engine, 'test': test, 'weight': weight})

    with open(CSV_PATH, 'w', newline='\n') as f:
        w = csv.DictWriter(f, fieldnames=['arch', 'binary', 'test', 'weight'], lineterminator='\n')
        w.writeheader()
        w.writerows(rows)
    print(f'Wrote {len(rows)} rows to {CSV_PATH}')


# ---------------------------------------------------------------------------
# run --shard N: run mandatory combos for one shard (no time limit)
# ---------------------------------------------------------------------------

def run_combo(engine, test, label, args):
    binary = args.dist_dir / engine
    if not binary.exists():
        print(f'[{label}] skip {engine}: not found', flush=True)
        return
    out = args.output_dir / f'{engine}.json'
    cmd = [str(BENCH_DIR / 'bench'), '-a', '-v',
           '-t', str(args.test_timeout), '-o', str(out), str(binary), test]
    print(f'[{label}] {engine} x {test}', flush=True)
    subprocess.run(cmd)


def cmd_run(args):
    bench   = load_bench()
    combos  = all_combos(bench)

    # Shard N (1-based) owns every Nth combo starting at index N-1.
    mandatory = combos[args.index - 1 :: args.num_shards]

    args.output_dir.mkdir(parents=True, exist_ok=True)
    print(f'shard {args.index}/{args.num_shards}  mandatory={len(mandatory)}')

    for i, (engine, test) in enumerate(mandatory):
        run_combo(engine, test, f'M {i+1}/{len(mandatory)}', args)


# ---------------------------------------------------------------------------
# sample --shard N: random weighted sampling to fill time budget
# ---------------------------------------------------------------------------

def cmd_sample(args):
    bench   = load_bench()
    combos  = all_combos(bench)
    weights_map = load_weights(detect_arch())
    combo_weights = [weights_map.get(c, 1.0) for c in combos]

    args.output_dir.mkdir(parents=True, exist_ok=True)
    start = time.monotonic()

    def elapsed():
        return time.monotonic() - start

    print(f'sampling limit={args.time_limit}s')

    n = 0
    while args.time_limit - elapsed() > 5:
        run_combo(*random.choices(combos, weights=combo_weights)[0], f'R{n+1}', args)
        n += 1


# ---------------------------------------------------------------------------
# merge: merge per-shard artifact dirs into per-engine files
# ---------------------------------------------------------------------------

def merge_jsons(files):
    docs = []
    for f in files:
        try:
            d = json.loads(Path(f).read_text())
        except Exception as e:
            print(f'  skip {f}: {e}')
            continue
        docs.append(d)
    docs.sort(key=lambda d: d.get('time', ''))

    merged = None
    for d in docs:
        if merged is None:
            merged = d
            continue
        for key, val in d.get('benchmarks', {}).items():
            dest = merged.setdefault('benchmarks', {}).setdefault(key, {})
            if val.get('error') and 'error' not in dest:
                dest['error'] = val['error']
            for field in ['score', 'user', 'sys', 'real', 'rss_mb']:
                combined = (dest.get(field) or []) + (val.get(field) or [])
                if combined:
                    dest[field] = combined
    if merged and 'benchmarks' in merged:
        merged['benchmarks'] = {k: v for k, v in merged['benchmarks'].items()
                                if v.get('error') or v.get('score')}
    return merged


def cmd_merge(args):
    if len(args.dirs) < 2:
        sys.exit('merge requires at least one input dir and an output dir')
    input_dirs, output_dir = args.dirs[:-1], args.dirs[-1]

    by_engine = {}
    for d in input_dirs:
        for f in sorted(d.glob('*.json')):
            by_engine.setdefault(f.stem, []).append(f)
    if not by_engine:
        print('no input files found')
        return
    output_dir.mkdir(parents=True, exist_ok=True)
    for engine, files in sorted(by_engine.items()):
        merged = merge_jsons(files)
        if merged:
            s = json.dumps(merged, indent=2)
            s = re.sub(r'(?<=": )(\[[^\[\]]+\])', lambda m: json.dumps(json.loads(m[1])), s)
            (output_dir / f'{engine}.json').write_text(s + '\n')
    print(f'merged {len(by_engine)} engines into {output_dir}')


# ---------------------------------------------------------------------------

def main():
    p = argparse.ArgumentParser(description=__doc__,
                                formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest='cmd', required=True)

    sub.add_parser('gen', help='analyze bench/{amd64,arm64}/*.json and write github-bench.csv with sampling weights')

    def add_run_args(sp):
        sp.add_argument('--test-timeout', type=int,  default=TEST_TIMEOUT,  metavar='SEC')
        sp.add_argument('--output-dir',   type=Path, default=Path('/results'))
        sp.add_argument('--dist-dir',     type=Path, default=Path('/dist'))

    all_cmd = sub.add_parser('run', help='run mandatory combos for one shard')
    all_cmd.add_argument('--index',      type=int, required=True, metavar='N',
                         help='shard index (1..num-shards)')
    all_cmd.add_argument('--num-shards', type=int, default=NUM_SHARDS)
    add_run_args(all_cmd)

    sample_cmd = sub.add_parser('sample', help='random weighted sampling to fill time budget')
    sample_cmd.add_argument('--time-limit', type=int, default=TIME_LIMIT, metavar='SEC')
    add_run_args(sample_cmd)

    col = sub.add_parser('merge', help='merge per-shard dirs into per-engine files: merge <input-dirs...> <output-dir>')
    col.add_argument('dirs', nargs='+', type=Path,
                     help='input dirs followed by output dir (last argument)')

    args = p.parse_args()
    {'gen': cmd_gen, 'run': cmd_run, 'sample': cmd_sample, 'merge': cmd_merge}[args.cmd](args)


if __name__ == '__main__':
    main()
