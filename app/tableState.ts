// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

import { ALL_COLUMNS, BENCHMARK_COLUMNS } from './columns';
import type { ColumnDef } from './columns';

export type SortDirection = 'asc' | 'desc';

export interface SortSpec {
  col: string;
  dir: SortDirection;
}

export interface TableState {
  arch: string;
  variants: boolean;
  jitless: boolean;
  search: string;
  sort: SortSpec[];
  visibleColumns: Record<string, boolean>;
  columnOrder: string[];
}

export interface HashState {
  page: string | null;
  params: URLSearchParams;
}

export const DEFAULT_SORT: SortSpec[] = [
  { col: 'score', dir: 'desc' },
  { col: 'language', dir: 'asc' },
  { col: 'github_stars', dir: 'desc' },
  { col: 'engine', dir: 'asc' },
];
export const VARIANTS_DEFAULT = 'base';
export const DEFAULT_ARCH = 'amd64';
// Default mask that matches the v8-v7 benchmark preset.
export const DEFAULT_MASK = 130688;

export function buildDefaultColumnState(columns: ColumnDef[]): Pick<TableState, 'visibleColumns' | 'columnOrder'> {
  const visibleColumns: Record<string, boolean> = {};
  for (const col of columns) {
    if (col.key === 'engine') {
      visibleColumns[col.key] = true;
      continue;
    }
    if (visibleColumns[col.key] === undefined) {
      visibleColumns[col.key] = !col.defaultHidden;
    }
  }
  const columnOrder = columns
    .filter((col) => col.key !== 'engine')
    .map((col) => col.key);
  return { visibleColumns, columnOrder };
}

export function createInitialState(): TableState {
  const state: TableState = {
    arch: DEFAULT_ARCH,
    variants: false,
    jitless: false,
    search: '',
    sort: DEFAULT_SORT.map((item) => ({ ...item })),
    visibleColumns: {},
    columnOrder: [],
  };
  resetColumnSelection(state);
  return state;
}

export function resetColumnSelection(state: TableState): void {
  const { visibleColumns, columnOrder } = buildDefaultColumnState(ALL_COLUMNS);
  state.visibleColumns = visibleColumns;
  BENCHMARK_COLUMNS.forEach((col, index) => {
    state.visibleColumns[col.key] = ((DEFAULT_MASK >> index) & 1) === 0;
  });
  state.columnOrder = columnOrder;
}

export function resetStateFromDefaults(state: TableState): void {
  const defaults = createInitialState();
  state.arch = defaults.arch;
  state.variants = defaults.variants;
  state.jitless = defaults.jitless;
  state.search = defaults.search;
  state.sort = defaults.sort;
  resetColumnSelection(state);
}

export function buildStateParams(state: TableState): URLSearchParams {
  const params = new URLSearchParams();
  if (state.arch !== DEFAULT_ARCH) {
    params.set('arch', state.arch);
  }
  if (state.variants) {
    params.set('variants', 'all');
  } else if (state.jitless) {
    params.set('variants', 'jitless');
  } else if (VARIANTS_DEFAULT !== 'base') {
    params.set('variants', VARIANTS_DEFAULT);
  }
  if (state.sort[0]) {
    const sortVal = (state.sort[0].dir === 'desc' ? '-' : '') + state.sort[0].col;
    if (sortVal !== '-score') {
      params.set('sort', sortVal);
    }
  }

  const orderedAll = ALL_COLUMNS.filter((col) => col.key !== 'engine');
  const allMap = new Map(orderedAll.map((col) => [col.key, col]));
  const orderedKeys: string[] = [];
  for (const key of state.columnOrder) {
    if (allMap.has(key)) {
      orderedKeys.push(key);
    }
  }
  for (const col of orderedAll) {
    if (!orderedKeys.includes(col.key)) {
      orderedKeys.push(col.key);
    }
  }
  const visibleKeys = orderedKeys.filter((key) => state.visibleColumns[key]);
  const defaultVisible = ALL_COLUMNS
    .filter((col) => !col.benchmark && !col.defaultHidden && col.key !== 'engine')
    .map((col) => col.key);
  BENCHMARK_COLUMNS.forEach((col, index) => {
    const hidden = ((DEFAULT_MASK >> index) & 1) === 1;
    if (!hidden) {
      defaultVisible.push(col.key);
    }
  });
  if (visibleKeys.join(' ') !== defaultVisible.join(' ')) {
    params.set('columns', visibleKeys.join(' '));
  }
  return params;
}

export function applyStateFromParams(state: TableState, params: URLSearchParams): void {
  const variantsParam = params.get('variants') ?? VARIANTS_DEFAULT;
  state.variants = variantsParam === 'all' || variantsParam === 'true';
  state.jitless = variantsParam === 'jitless';
  state.arch = params.get('arch') ?? state.arch;

  const sortMatch = (params.get('sort') ?? '').match(/^(-?)(\w+)$/);
  const validCols = new Set(ALL_COLUMNS.map((col) => col.key));
  if (sortMatch && validCols.has(sortMatch[2])) {
    state.sort = [{
      col: sortMatch[2],
      dir: sortMatch[1] === '-' ? 'desc' : 'asc',
    }];
  }

  const columnsParam = params.get('columns');
  if (columnsParam) {
    const requested = columnsParam.split(/\s+/).map((key) => key.trim()).filter(Boolean);
    const valid = new Set(ALL_COLUMNS.map((col) => col.key));
    const visible = new Set(requested.filter((key) => valid.has(key)));
    visible.add('engine');
    for (const col of ALL_COLUMNS) {
      if (col.key === 'engine') {
        state.visibleColumns[col.key] = true;
        continue;
      }
      state.visibleColumns[col.key] = visible.has(col.key);
    }
    const ordered = requested.filter((key) => {
      const col = ALL_COLUMNS.find((item) => item.key === key);
      return col && col.key !== 'engine';
    });
    state.columnOrder = ordered;
  } else {
    const maskParam = params.get('mask');
    let mask = maskParam ? Number.parseInt(maskParam, 10) : DEFAULT_MASK;
    // Legacy URL param: v8=false meant "show all benchmarks".
    if (params.get('v8') === 'false') {
      mask = 0;
    }
    BENCHMARK_COLUMNS.forEach((col, index) => {
      state.visibleColumns[col.key] = ((mask >> index) & 1) === 0;
    });
  }

  if (state.sort.length === 1) {
    const primary = state.sort[0];
    state.sort = [
      primary,
      ...DEFAULT_SORT.filter((item) => item.col !== primary.col),
    ];
  }
}

export function applySort(state: TableState, column: ColumnDef): void {
  if (state.sort[0]?.col === column.key) {
    state.sort[0].dir = state.sort[0].dir === 'desc' ? 'asc' : 'desc';
    return;
  }
  const dir = column.numeric ? 'desc' : 'asc';
  state.sort.unshift({ col: column.key, dir });
}

export function isColumnVisible(state: TableState, column: ColumnDef): boolean {
  if (column.key === 'engine') {
    return true;
  }
  if (column.benchmark) {
    return Boolean(state.visibleColumns[column.key]);
  }
  return state.visibleColumns[column.key] !== false;
}

export function isSortedColumn(state: TableState, column: ColumnDef): boolean {
  return state.sort[0]?.col === column.key;
}

export function buildHash(page: string | null, params: URLSearchParams): string {
  const paramsString = params.toString();
  const segments: string[] = [];
  if (page) {
    segments.push(encodeURIComponent(page));
  }
  if (paramsString) {
    segments.push(paramsString);
  }
  const combined = segments.join('&');
  return combined ? `#${combined}` : '';
}

export function buildPageHash(page: string | null): string {
  return buildHash(page, new URLSearchParams());
}

export function parseHashLocation(hash?: string): HashState {
  const raw = (hash ?? (typeof window !== 'undefined' ? window.location.hash : ''))
    .replace(/^#/, '')
    .trim();
  if (!raw) {
    return { page: null, params: new URLSearchParams() };
  }
  const parts = raw.split('&').filter(Boolean);
  if (!parts.length) {
    return { page: null, params: new URLSearchParams() };
  }
  const first = parts[0];
  if (first.includes('=')) {
    return { page: null, params: new URLSearchParams(parts.join('&')) };
  }
  const page = decodeURIComponent(first);
  const params = new URLSearchParams(parts.slice(1).join('&'));
  return { page: page || null, params };
}

export function getLocationState(): HashState {
  if (typeof window === 'undefined') {
    return { page: null, params: new URLSearchParams() };
  }
  const legacyParams = new URLSearchParams(window.location.search);
  const legacyString = legacyParams.toString();
  const hashState = parseHashLocation();
  if (legacyString) {
    const nextHash = buildHash(hashState.page, legacyParams);
    const url = window.location.pathname + nextHash;
    window.history.replaceState(null, '', url);
    return { page: hashState.page, params: legacyParams };
  }
  return hashState;
}

export function buildStateHash(state: TableState): string {
  return buildHash(null, buildStateParams(state));
}

export function loadStateFromUrl(state: TableState): void {
  if (typeof window === 'undefined') {
    return;
  }
  const { params } = getLocationState();
  applyStateFromParams(state, params);
}

export function saveStateToUrl(state: TableState): void {
  if (typeof window === 'undefined') {
    return;
  }
  const params = buildStateParams(state);

  const { page } = parseHashLocation();
  const nextHash = page ? buildPageHash(page) : buildHash(null, params);
  const url = window.location.pathname + nextHash;
  if (window.location.hash !== nextHash || window.location.search) {
    window.history.replaceState(null, '', url);
  }
}
