// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

import type { ColumnDef } from './columns';
import type { TableState } from './state';

export interface BenchRow {
  arch?: string;
  binary_size?: number;
  dist_size?: number;
  revision?: string;
  revision_date?: string;
  [key: string]: unknown;
}

export interface ConformanceData {
  [key: string]: number;
}

export interface EngineEntry {
  id: string;
  title?: string;
  engine?: string;
  summary?: string;
  jsz_url?: string;
  homepage?: string;
  repository?: string;
  branch?: string;
  version?: string;
  revision?: string;
  revision_date?: string;
  variant?: string;
  language?: string;
  license?: string;
  license_abbr?: string;
  standard?: string;
  years?: string;
  type?: string;
  platform?: string;
  jit?: string;
  loc?: number;
  loc_detailed?: string;
  github?: string;
  github_stars?: number;
  github_forks?: number;
  github_contributors?: number;
  org?: string;
  tech?: string;
  note?: string;
  bench?: BenchRow[];
  conformance?: ConformanceData;
  [key: string]: unknown;
}

export interface TableRow extends EngineEntry {
  score?: number;
  binary_size?: number;
  dist_size?: number;
}

export interface CellContent {
  text?: string;
  html?: string;
  title?: string;
  className?: string;
}

export function buildRows(
  engines: EngineEntry[],
  state: TableState,
  benchmarks: ColumnDef[],
): TableRow[] {
  const output: TableRow[] = [];
  const query = state.search.trim();
  const matcher = buildSearchMatcher(query);

  for (const engine of engines) {
    let baseRow: TableRow = { ...engine };
    if (typeof baseRow.conformance === 'object' && baseRow.conformance) {
      baseRow = { ...baseRow, ...baseRow.conformance };
    }

    let joined: TableRow[] = [baseRow];
    if (Array.isArray(baseRow.bench) && baseRow.bench.length > 0) {
      joined = baseRow.bench.map((benchRow) => ({ ...baseRow, ...benchRow }));
    }

    const archFiltered = joined.filter((row) => row.arch === state.arch);
    joined = archFiltered.length ? archFiltered : [baseRow];

    if (state.jitless) {
      const jitlessRows = joined.filter((row) => {
        const hasJit = row.jit && row.jit !== 'no';
        const isJitlessVariant =
          typeof row.variant === 'string' && row.variant.toLowerCase().includes('jitless');
        return !hasJit || isJitlessVariant;
      });

      const jitlessVariants = jitlessRows.filter(
        (row) => typeof row.variant === 'string' && row.variant.toLowerCase().includes('jitless'),
      );
      joined = jitlessVariants.length > 0 ? jitlessVariants : jitlessRows;
    }

    if (!state.variants) {
      if (state.jitless) {
        joined = joined.filter(
          (row) =>
            !row.variant ||
            (typeof row.variant === 'string' && row.variant.toLowerCase().includes('jitless')),
        );
      } else {
        joined = joined.filter((row) => !row.variant);
      }
    }

    for (const row of joined) {
      if (matcher && !matcher(row)) {
        continue;
      }
      output.push(row);
    }
  }

  for (const row of output) {
    if (typeof row.binary_size !== 'number' && typeof row.dist_size === 'number') {
      row.binary_size = -row.dist_size;
    }

    const selectedScores: number[] = [];
    for (const col of benchmarks) {
      if (!state.visibleColumns[col.key]) {
        continue;
      }
      const value = row[col.key];
      if (typeof value === 'number' && !Number.isNaN(value)) {
        selectedScores.push(value);
      }
    }

    if (selectedScores.length) {
      row.score = Math.round(geometricMean(selectedScores));
    }
  }

  return output;
}

function buildSearchMatcher(query: string): ((row: TableRow) => boolean) | null {
  if (!query) {
    return null;
  }
  const normalized = query.startsWith('/') && query.endsWith('/') && query.length > 1
    ? query.slice(1, -1)
    : query;
  let regex: RegExp;
  try {
    regex = new RegExp(normalized, 'i');
  } catch (error) {
    console.warn('Invalid search regex, falling back to plain match:', error);
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    return (row) => {
      if (!tokens.length) {
        return true;
      }
      const haystack = collectSearchValues(row).join(' ').toLowerCase();
      return tokens.every((token) => haystack.includes(token));
    };
  }
  return (row) => {
    const haystack = collectSearchValues(row).join(' ');
    return regex.test(haystack);
  };
}

function collectSearchValues(value: unknown, parts: string[] = []): string[] {
  if (value === null || value === undefined) {
    return parts;
  }
  if (typeof value === 'boolean') {
    return parts;
  }
  if (typeof value === 'string' || typeof value === 'number') {
    parts.push(String(value));
    return parts;
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      collectSearchValues(item, parts);
    }
    return parts;
  }
  if (typeof value === 'object') {
    for (const item of Object.values(value)) {
      collectSearchValues(item, parts);
    }
  }
  return parts;
}

export function sortRows(rows: TableRow[], sortSpec: TableState['sort']): TableRow[] {
  return [...rows].sort((row1, row2) => {
    let res = 0;
    for (let i = 0; i < sortSpec.length && res === 0; i += 1) {
      const col = sortSpec[i].col;
      const a = sortCollate(row1[col], col, row1);
      const b = sortCollate(row2[col], col, row2);
      if (a === b) {
        continue;
      }
      if (a === '' || b === '') {
        return a === '' ? 1 : -1;
      }
      if (!Number.isNaN(Number(a)) && !Number.isNaN(Number(b))) {
        res = Number(a) - Number(b);
      } else {
        res = String(a).localeCompare(String(b));
      }
      res *= sortSpec[i].dir === 'asc' ? 1 : -1;
    }
    return res;
  });
}

function sortCollate(val: unknown, col: string, row: TableRow): string | number {
  let value: unknown = val ?? '';
  if (typeof value === 'object' && value && 'value' in value) {
    value = (value as { value: unknown }).value;
  }
  if (col === 'binary_size' && typeof value === 'number') {
    value = Math.abs(value);
  }
  let normalized = String(value).trim();
  if (col === 'engine') {
    normalized = (row.title ?? row.engine ?? '').toString();
  }
  if (col === 'description') {
    normalized = (row.summary ?? '').toString();
  }
  if (col === 'standard') {
    normalized = normalized
      .replace(/^no$/, 'ES0000')
      .replace(/JS1.[0-2]/, 'ES0001')
      .replace(/JS1.[3-4]/, 'ES0003')
      .replace(/JS1.[5-8]/, 'ES0004')
      .replace('ESnext', 'ES9999')
      .replace(/([0-9]+)/g, (g) => g.padStart(4, '0'))
      .replace('+', '9')
      .replace(' (partial)', '0')
      .replace(/([0-9]+)/g, (g) => g.padEnd(5, '5'));
  }
  if (col === 'years') {
    normalized = normalized.replace('x', '9');
  }
  if (col === 'language') {
    normalized = normalized.replace('#', '++#').replace('TypeScript', 'JavaScript, TS');
  }
  return normalized;
}

function geometricMean(values: number[]): number {
  if (!values.length) {
    return Number.NaN;
  }
  const sum = values.map((x) => Math.log(x)).reduce((x, y) => x + y, 0);
  return Math.exp(sum / values.length);
}
