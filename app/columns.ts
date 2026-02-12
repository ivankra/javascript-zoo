// SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

export interface ColumnDef {
  key: string;
  label: string;
  title?: string;
  numeric?: boolean;
  className?: string;
  benchmark?: boolean;
  v8?: boolean;
  defaultHidden?: boolean;
}

export const BASE_COLUMNS: ColumnDef[] = [
  { key: 'engine', label: 'Engine', className: 'engine-cell' },
  {
    key: 'score',
    label: 'Score',
    numeric: true,
    title: 'Geometric mean of selected benchmarks (higher is better - inversely proportional to runtime)',
  },
  { key: 'binary_size', label: 'Binary', numeric: true, title: 'Binary size' },
  { key: 'loc', label: 'LOC', numeric: true, title: 'Core engine lines of code, excluding blank lines, comments, tests and third-party code' },
  { key: 'language', label: 'Language', title: 'Main programming language' },
  { key: 'jit', label: 'JIT', title: 'Just-in-time compilation' },
  { key: 'years', label: 'Years', title: 'Years of active development' },
  { key: 'standard', label: 'Target', title: 'Target ECMAScript specification version' },
  { key: 'es1', label: 'ES1', numeric: true, title: 'ES1 test suite pass rate', defaultHidden: true },
  { key: 'es3', label: 'ES3', numeric: true, title: 'ES3 test suite pass rate', defaultHidden: true },
  { key: 'es5', label: 'ES5', numeric: true, title: 'ES5 test suite pass rate', defaultHidden: true },
  { key: 'es1-es5', label: 'ES1-5', numeric: true, title: 'ES1-ES5 test suite pass rate' },
  { key: 'kangax-es6', label: 'ES6', numeric: true, title: "ES6 conformance (compat-table's weighted score)" },
  { key: 'kangax-es2016plus', label: 'ES2016+', numeric: true, title: "ES2016+ conformance (compat-table's weighted score)" },
  { key: 'kangax-es2016', label: 'ES2016', numeric: true, title: "ES2016 conformance (compat-table's weighted score)", defaultHidden: true },
  { key: 'kangax-es2017', label: 'ES2017', numeric: true, title: "ES2017 conformance (compat-table's weighted score)", defaultHidden: true },
  { key: 'kangax-es2018', label: 'ES2018', numeric: true, title: "ES2018 conformance (compat-table's weighted score)", defaultHidden: true },
  { key: 'kangax-es2019', label: 'ES2019', numeric: true, title: "ES2019 conformance (compat-table's weighted score)", defaultHidden: true },
  { key: 'kangax-es2020', label: 'ES2020', numeric: true, title: "ES2020 conformance (compat-table's weighted score)", defaultHidden: true },
  { key: 'kangax-es2021', label: 'ES2021', numeric: true, title: "ES2021 conformance (compat-table's weighted score)", defaultHidden: true },
  { key: 'kangax-es2022', label: 'ES2022', numeric: true, title: "ES2022 conformance (compat-table's weighted score)", defaultHidden: true },
  { key: 'kangax-es2023', label: 'ES2023', numeric: true, title: "ES2023 conformance (compat-table's weighted score)", defaultHidden: true },
  { key: 'kangax-es2024', label: 'ES2024', numeric: true, title: "ES2024 conformance (compat-table's weighted score)", defaultHidden: true },
  { key: 'kangax-es2025', label: 'ES2025', numeric: true, title: "ES2025 conformance (compat-table's weighted score)", defaultHidden: true },
  { key: 'kangax-intl', label: 'ESIntl', numeric: true, title: "ESIntl conformance (compat-table's weighted score)", defaultHidden: true },
  { key: 'kangax-next', label: 'ESNext', numeric: true, title: "ESNext conformance (compat-table's weighted score)", defaultHidden: true },
  { key: 'github_stars', label: 'Stars', numeric: true, title: 'GitHub stars' },
  { key: 'github_forks', label: 'Forks', numeric: true, title: 'GitHub forks', defaultHidden: true },
  { key: 'github_contributors', label: 'Contributors', numeric: true, title: 'GitHub contributors count (for whole repo)' },
  { key: 'org', label: 'Org', title: 'Organization backing the project' },
  { key: 'license', label: 'License', className: 'license-cell', title: 'Software license' },
  { key: 'platform', label: 'Platform', title: 'Runtime platform' },
  { key: 'description', label: 'Description', className: 'description-cell', title: 'Headline summary' },
  { key: 'interpreter', label: 'Interpreter', title: 'Interpreter type', defaultHidden: true },
  { key: 'regex', label: 'Regex', title: 'Regular expression engine', defaultHidden: true },
  { key: 'ancestors', label: 'Ancestor', title: 'Ancestor engine', defaultHidden: true },
];

export const BENCHMARK_COLUMNS: ColumnDef[] = [
  {
    key: 'Richards',
    label: 'Richards',
    numeric: true,
    benchmark: true,
    v8: true,
    title: 'Task scheduler simulator: property access benchmark',
  },
  {
    key: 'DeltaBlue',
    label: 'DeltaBlue',
    numeric: true,
    benchmark: true,
    v8: true,
    title: 'Constraint solver: polymorphism benchmark',
  },
  {
    key: 'Crypto',
    label: 'Crypto',
    numeric: true,
    benchmark: true,
    v8: true,
    title: 'RSA encryption: integer/bit operations, arrays',
  },
  {
    key: 'RayTrace',
    label: 'RayTrace',
    numeric: true,
    benchmark: true,
    v8: true,
    title: 'Floats and objects',
  },
  {
    key: 'EarleyBoyer',
    label: 'EarleyBoyer',
    numeric: true,
    benchmark: true,
    v8: true,
    title: 'Scheme interpreter: memory/GC, variadic functions',
  },
  {
    key: 'RegExp',
    label: 'RegExp',
    numeric: true,
    benchmark: true,
    v8: true,
    title: 'Regex, strings and arrays',
  },
  {
    key: 'Splay',
    label: 'Splay',
    numeric: true,
    benchmark: true,
    v8: true,
    title: 'Memory/GC benchmark',
  },
  {
    key: 'SplayLatency',
    label: 'SplayLatency',
    numeric: true,
    benchmark: true,
    title: 'GC latency',
  },
  {
    key: 'NavierStokes',
    label: 'NavierStokes',
    numeric: true,
    benchmark: true,
    v8: true,
    title: 'Fluid simulation: floats and arrays',
  },
  {
    key: 'PdfJS',
    label: 'PdfJS',
    numeric: true,
    benchmark: true,
    title: 'PDF.js parser: bit operations and arrays',
  },
  {
    key: 'Mandreel',
    label: 'Mandreel',
    numeric: true,
    benchmark: true,
    title: 'C++ physics engine',
  },
  {
    key: 'MandreelLatency',
    label: 'MandreelLatency',
    numeric: true,
    benchmark: true,
    title: 'Compilation latency',
  },
  {
    key: 'Gameboy',
    label: 'Gameboy',
    numeric: true,
    benchmark: true,
    title: 'GB emulator: typed arrays and property access',
  },
  {
    key: 'CodeLoad',
    label: 'CodeLoad',
    numeric: true,
    benchmark: true,
    title: 'jQuery and Closure load speed',
  },
  {
    key: 'Box2D',
    label: 'Box2D',
    numeric: true,
    benchmark: true,
    title: 'C physics engine',
  },
  {
    key: 'zlib',
    label: 'zlib',
    numeric: true,
    benchmark: true,
    title: 'Emscripten/asm.js benchmark',
  },
  {
    key: 'Typescript',
    label: 'Typescript',
    numeric: true,
    benchmark: true,
    title: 'Typescript compiler compiling itself: large real-world codebase',
  },
];

export const ALL_COLUMNS: ColumnDef[] = [...BASE_COLUMNS, ...BENCHMARK_COLUMNS];
