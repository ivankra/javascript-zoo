#!/usr/bin/env python3
# GitHub CI benchmark driver for javascript-zoo.
#
# Two-stage benchmarking:
#
#   Stage 1 (run):    Every (engine, test) combo is run exactly once, spread
#                     across N shards. Shard k gets every Nth combo starting
#                     at index k-1.
#
#   Ranking (rank):   Merged stage-1 results are ranked by geometric-mean
#                     score. Per-engine weights decay exponentially by rank:
#                     top ~5 engines get weight 50-100, dropping to ~1 by
#                     rank 30.
#
#   Stage 2 (sample): Shards draw weighted-random (engine, test) pairs,
#                     concentrating additional samples on top-ranked engines.
#
#   Merge (merge):    Per-shard results are merged into per-engine files.
#
# Usage:
#   github-bench.py run --index N [options]         Run mandatory combos for shard N
#   github-bench.py rank <dir> -o weights.json      Rank engines, output sampling weights
#   github-bench.py sample -w weights.json [opts]   Weighted random sampling
#   github-bench.py merge <dirs...> <output-dir>    Merge per-shard dirs into per-engine files

from __future__ import annotations
import argparse, json, math, random, re, statistics, subprocess, sys, time
from pathlib import Path

BENCH_DIR  = Path(__file__).resolve().parent
ROOT_DIR   = BENCH_DIR.parent
TIME_LIMIT   = 1800   # seconds per stage-2 shard (~30 min)
TEST_TIMEOUT = 1800   # seconds per individual test run

# Weight formula: weight(rank) = max(1, round(100 * exp(-RANK_DECAY * (rank - 1))))
#   rank 1  -> 100     rank 5  -> 55     rank 10 -> 26
#   rank 15 ->  12     rank 20 ->  6     rank 30 ->  1
RANK_DECAY = 0.15

OCTANE_TESTS = [
    'richards.js', 'deltablue.js', 'crypto.js', 'raytrace.js',
    'earley-boyer.js', 'regexp.js', 'splay.js', 'navier-stokes.js',
    'pdfjs.js', 'mandreel.js', 'gbemu.js', 'code-load.js',
    'box2d.js', 'zlib.js', 'typescript.js',
]


def engine_tests(engine: str, dist_dir: Path) -> list[str]:
    """Return the benchmark test list for an engine, using harness config."""
    sys.path.insert(0, str(ROOT_DIR))
    from harness import EngineConfig
    try:
        cfg = EngineConfig.load(str(dist_dir / engine))
        if cfg.bench_suite:
            return list(cfg.bench_suite)
    except Exception:
        pass
    return OCTANE_TESTS


def all_combos(dist_dir: Path) -> list[tuple[str, str]]:
    """Sorted list of (engine, test) from /dist/LIST."""
    engines = [l.strip() for l in open(dist_dir / 'LIST') if l.strip()]
    return sorted((e, t) for e in engines for t in engine_tests(e, dist_dir))


def rank_weight(rank: int) -> int:
    """Exponentially decaying weight by rank."""
    return max(1, round(100 * math.exp(-RANK_DECAY * (rank - 1))))


def run_combo(engine: str, test: str, label: str, args: argparse.Namespace) -> None:
    binary = args.dist_dir / engine
    if not binary.exists():
        print(f'[{label}] skip {engine}: not found', flush=True)
        return
    out = args.output_dir / f'{engine}.json'
    cmd = [sys.executable, str(BENCH_DIR / 'bench.py'), '-a', '-v',
           '-t', str(args.test_timeout), '-o', str(out), str(binary), test]
    print(f'[{label}] {engine} x {test}', flush=True)
    subprocess.run(cmd)


# ---------------------------------------------------------------------------
# run: stage 1 — every combo exactly once
# ---------------------------------------------------------------------------

def cmd_run(args: argparse.Namespace) -> None:
    combos = all_combos(args.dist_dir)
    mandatory = combos[args.index - 1 :: args.num_shards]
    args.output_dir.mkdir(parents=True, exist_ok=True)
    print(f'shard {args.index}/{args.num_shards}  mandatory={len(mandatory)}')
    for i, (engine, test) in enumerate(mandatory):
        run_combo(engine, test, f'{i+1}/{len(mandatory)}', args)


# ---------------------------------------------------------------------------
# rank: compute per-engine weights from merged stage-1 results
# ---------------------------------------------------------------------------

def cmd_rank(args: argparse.Namespace) -> None:
    engine_gm: dict[str, float] = {}
    for f in sorted(args.input_dir.glob('*.json')):
        try:
            d = json.loads(f.read_text())
        except Exception:
            continue
        scores: list[float] = []
        for key, val in d.get('benchmarks', {}).items():
            if key.endswith('Latency'):
                continue
            good = [v for v in (val.get('score') or []) if v and v > 0]
            if good:
                scores.append(statistics.median(good))
        if scores:
            engine_gm[f.stem] = math.exp(sum(math.log(s) for s in scores) / len(scores))

    ranked = sorted(engine_gm.items(), key=lambda x: -x[1])
    weights: dict[str, int] = {}
    for rank, (engine, _) in enumerate(ranked, 1):
        weights[engine] = rank_weight(rank)

    # Engines with files but no valid scores get weight 0 (skip in sampling)
    for f in args.input_dir.glob('*.json'):
        weights.setdefault(f.stem, 0)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(weights, indent=2, sort_keys=True) + '\n')

    for rank, (engine, gm) in enumerate(ranked, 1):
        print(f'  #{rank:3d}  {engine:30s}  geomean={gm:10.1f}  weight={weights[engine]}')
    n_zero = sum(1 for w in weights.values() if w == 0)
    print(f'\nWrote {len(weights)} engine weights ({len(ranked)} ranked, {n_zero} zero) to {args.output}')


# ---------------------------------------------------------------------------
# sample: stage 2 — weighted random sampling
# ---------------------------------------------------------------------------

def cmd_sample(args: argparse.Namespace) -> None:
    combos = all_combos(args.dist_dir)
    weights = json.loads(args.weights.read_text())

    valid = [(c, weights.get(c[0], 0)) for c in combos]
    valid = [(c, w) for c, w in valid if w > 0]
    if not valid:
        print('no combos with positive weight')
        return
    combos_f, weights_f = zip(*valid)

    if args.seed is not None:
        random.seed(args.seed)

    args.output_dir.mkdir(parents=True, exist_ok=True)
    start = time.monotonic()
    print(f'sampling limit={args.time_limit}s  seed={args.seed}  combos={len(combos_f)}')

    n = 0
    while args.time_limit - (time.monotonic() - start) > 5:
        engine, test = random.choices(combos_f, weights=weights_f)[0]
        run_combo(engine, test, f'S{n+1}', args)
        n += 1
    print(f'completed {n} samples')


# ---------------------------------------------------------------------------
# merge: combine per-shard dirs into per-engine files
# ---------------------------------------------------------------------------

def merge_jsons(files: list[Path]) -> dict | None:
    docs = []
    for f in files:
        try:
            d = json.loads(f.read_text())
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


def cmd_merge(args: argparse.Namespace) -> None:
    if len(args.dirs) < 2:
        sys.exit('merge requires at least one input dir and an output dir')
    input_dirs, output_dir = args.dirs[:-1], args.dirs[-1]

    by_engine: dict[str, list[Path]] = {}
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

def main() -> None:
    p = argparse.ArgumentParser(description=__doc__,
                                formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest='cmd', required=True)

    def add_run_args(sp: argparse.ArgumentParser) -> None:
        sp.add_argument('--test-timeout', type=int, default=TEST_TIMEOUT, metavar='SEC')
        sp.add_argument('--output-dir',   type=Path, default=Path('/results'))
        sp.add_argument('--dist-dir',     type=Path, default=Path('/dist'))

    run_p = sub.add_parser('run', help='stage 1: run mandatory combos for one shard')
    run_p.add_argument('--index',      type=int, required=True, metavar='N',
                       help='shard index (1..num-shards)')
    run_p.add_argument('--num-shards', type=int, default=50)
    add_run_args(run_p)

    rank_p = sub.add_parser('rank', help='rank engines from merged results, output weights')
    rank_p.add_argument('input_dir', type=Path)
    rank_p.add_argument('-o', '--output', type=Path, required=True)

    sample_p = sub.add_parser('sample', help='stage 2: weighted random sampling')
    sample_p.add_argument('-w', '--weights', type=Path, required=True)
    sample_p.add_argument('--time-limit', type=int, default=TIME_LIMIT, metavar='SEC')
    sample_p.add_argument('--seed', type=int, default=None)
    add_run_args(sample_p)

    merge_p = sub.add_parser('merge', help='merge per-shard dirs: merge <input-dirs...> <output-dir>')
    merge_p.add_argument('dirs', nargs='+', type=Path)

    args = p.parse_args()
    {'run': cmd_run, 'rank': cmd_rank, 'sample': cmd_sample, 'merge': cmd_merge}[args.cmd](args)


if __name__ == '__main__':
    main()
