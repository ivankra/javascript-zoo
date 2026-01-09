<!-- SPDX-FileCopyrightText: 2026 Ivan Krasilnikov -->
<!-- SPDX-License-Identifier: MIT -->

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { ALL_COLUMNS, BENCHMARK_COLUMNS } from './columns';
import { buildRows, sortRows } from './data';
import EngineTableControls from './EngineTableControls.vue';
import {
  applySort,
  buildHash,
  createInitialState,
  initColumnOrder,
  initVisibleColumns,
  loadStateFromUrl,
  parseHashLocation,
  resetStateFromDefaults,
  saveStateToUrl,
  withBase,
} from './state';
import type { ColumnDef } from './columns';
import type { CellContent, EngineEntry, TableRow } from './data';
import type { TableState } from './state';

const props = withDefaults(defineProps<{
  state?: TableState;
  showControls?: boolean;
  engines?: EngineEntry[];
}>(), {
  showControls: true,
  engines: () => [],
});
const emit = defineEmits<{
  (event: 'select-engine', id: string): void;
}>();
const internalState = reactive(createInitialState());
const state = props.state ?? internalState;
const hydrated = ref(false);
const hasHorizontalScroll = ref(false);

initVisibleColumns(state, ALL_COLUMNS);
initColumnOrder(state, ALL_COLUMNS);

const rows = computed(() => {
  const data = buildRows(props.engines ?? [], state, BENCHMARK_COLUMNS);
  return sortRows(data, state.sort);
});

const columns = computed(() => {
  const base = ALL_COLUMNS.filter((col) => !col.benchmark);
  const baseMap = new Map(base.map((col) => [col.key, col]));
  const ordered: ColumnDef[] = [];
  const engine = baseMap.get('engine');
  if (engine) {
    ordered.push(engine);
  }
  for (const key of state.columnOrder) {
    if (key === 'engine') {
      continue;
    }
    const col = baseMap.get(key);
    if (col) {
      ordered.push(col);
    }
  }
  for (const col of base) {
    if (!ordered.includes(col) && col.key !== 'engine') {
      ordered.push(col);
    }
  }
  return [...ordered, ...BENCHMARK_COLUMNS];
});

const displayRows = computed(() => {
  return rows.value.map((row) => {
    const cells: Record<string, CellContent> = {};
    for (const col of columns.value) {
      cells[col.key] = renderCell(col, row);
    }
    return { row, cells };
  });
});

function isColumnVisible(col: ColumnDef): boolean {
  if (col.key === 'engine') {
    return true;
  }
  if (col.benchmark) {
    return Boolean(state.visibleColumns[col.key]);
  }
  return state.visibleColumns[col.key] !== false;
}

function isSorted(col: ColumnDef): boolean {
  return state.sort[0]?.col === col.key;
}

function columnClasses(col: ColumnDef): string[] {
  const classes = [col.key];
  if (col.numeric) {
    classes.push('numeric');
  }
  if (col.benchmark) {
    classes.push('benchmark');
  }
  if (col.className) {
    classes.push(col.className);
  }
  if (isSorted(col)) {
    classes.push('sorted-column');
  }
  if (!isColumnVisible(col)) {
    classes.push('hidden');
  }
  return classes;
}

function sortHeaderClass(col: ColumnDef): string | undefined {
  if (!isSorted(col)) {
    return undefined;
  }
  return state.sort[0].dir === 'asc' ? 'sort-asc' : 'sort-desc';
}

function cellClasses(col: ColumnDef, cell: CellContent): string[] {
  const classes = columnClasses(col);
  if (cell.className) {
    classes.push(cell.className);
  }
  return classes;
}

function shortBenchmarkLabel(key: string): string {
  return key.replace('Latency', 'L');
}

function formatLoc(loc?: number): CellContent {
  if (!Number(loc)) {
    return {};
  }
  let size = Number(loc);
  let i = 0;
  const suffix = ['', 'K', 'M'];
  while (size >= 1000 && i < suffix.length - 1) {
    size /= 1000;
    i += 1;
  }
  return {
    text: size.toFixed(size < 20 ? 1 : 0) + suffix[i],
    title: String(loc),
  };
}

function formatBinarySize(binarySize?: number, distSize?: number): CellContent {
  if (!Number(binarySize)) {
    return {};
  }
  const isDist = Number(binarySize) < 0;
  let size = Math.abs(Number(binarySize));
  let i = 0;
  const suffix = ['', 'K', 'M'];
  while (size >= 1024 && i < suffix.length - 1) {
    size /= 1024;
    i += 1;
  }
  const cell: CellContent = {
    text: size.toFixed(size < 20 ? 1 : 0) + suffix[i],
  };
  if (isDist) {
    cell.title = `Not a single native binary. Distribution size: ${distSize} bytes`;
    cell.className = 'special';
  } else {
    cell.title = `${binarySize} bytes`;
  }
  return cell;
}

function formatStars(value?: number, repo?: string, github?: string): CellContent {
  if (!Number(value)) {
    return {};
  }
  const text = value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value.toFixed(0);
  return {
    text,
    title: github ?? repo ?? undefined,
  };
}

function formatLicense(license?: string, licenseAbbr?: string): CellContent {
  if (!license) {
    return {};
  }
  let title: string | undefined;
  if (license === 'UPL-1.0') {
    title = 'Universal Permissive License 1.0';
  } else if (license === 'BSL-1.0') {
    title = 'Boost Software License 1.0';
  } else if (licenseAbbr && licenseAbbr !== license) {
    title = license;
  }

  const display = (licenseAbbr ?? license)
    .split('/')
    .map((part) => `<nobr>${part}</nobr>`)
    .join('/');

  const cell: CellContent = {
    html: display,
    title,
  };

  if (license.match(/(proprietary|custom|missing|agpl)/i)) {
    cell.className = 'red';
  }
  return cell;
}

function formatStandard(standard?: string): CellContent {
  if (!standard) {
    return {};
  }
  if (standard === 'no') {
    return {};
  }
  return {
    text: standard,
  };
}

function formatConformance(value: unknown): CellContent {
  if (typeof value === 'number') {
    const text = (value * 100).toFixed(0) + '%';
    return {
      text,
      title: value !== 0 && value !== 1 ? (value * 100).toFixed(2) + '%' : undefined,
    };
  }
  if (value) {
    return { text: String(value) };
  }
  return {};
}

function formatLanguage(language?: string): CellContent {
  if (!language) {
    return {};
  }
  const html = language.replace(/ \(.*\)/, '<sup>*</sup>').replace(/ +/g, '<br>');
  return {
    html,
    title: html !== language ? language : undefined,
  };
}

function formatYears(years?: string): CellContent {
  if (!years) {
    return {};
  }
  const html = years.replace(/-/, '-<br>');
  return {
    html,
    className: years.endsWith('-') ? undefined : 'special',
  };
}

function formatJit(jit?: string): CellContent {
  if (!jit) {
    return {};
  }
  return {
    text: 'Y',
    title: jit,
  };
}

function formatDescription(row: TableRow): CellContent {
  const parts: string[] = [];
  if (row.summary) {
    parts.push(row.summary);
  }
  if (row.tech) {
    parts.push(`Tech: ${row.tech}`);
  }
  if (row.note) {
    parts.push(row.note);
  }
  return parts.length ? { html: parts.join('<br>') } : {};
}

function formatBenchmark(value: unknown, detail?: unknown, error?: unknown): CellContent {
  if (error) {
    return {
      text: '❌',
      title: String(error),
      className: 'missing',
    };
  }
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return {};
  }
  const cell: CellContent = {
    text: String(Math.round(value)),
  };

  if (detail) {
    cell.title = String(detail);
  }
  return cell;
}

function onHeaderClick(col: ColumnDef, event: MouseEvent): void {
  const target = event.target as HTMLElement;
  if (target?.tagName?.toUpperCase() === 'INPUT') {
    return;
  }
  applySort(state, col);
}

function onTableClick(event: MouseEvent): void {
  const target = event.target as HTMLElement | null;
  if (!target) {
    return;
  }
  const selection = window.getSelection();
  if (selection && selection.type === 'Range' && selection.toString()) {
    return;
  }
  if (target.closest('thead')) {
    return;
  }
  if (target.closest('button, input, select, textarea, label, summary')) {
    return;
  }
  const link = target.closest('a') as HTMLAnchorElement | null;
  if (link && !link.classList.contains('engine-name')) {
    return;
  }
  if (link?.classList.contains('engine-name')) {
    const id = link.dataset.engineId;
    if (!id) {
      return;
    }
    event.preventDefault();
    emit('select-engine', id);
    return;
  }
  const row = target.closest('tr');
  const id = row?.dataset.engineId;
  if (!id) {
    return;
  }
  emit('select-engine', id);
}

function onWindowScroll(): void {
  hasHorizontalScroll.value = window.scrollX > 1;
}

function engineLink(row: TableRow): string {
  if (row.id) {
    const params = typeof window === 'undefined' ? new URLSearchParams() : parseHashLocation().params;
    return `${withBase('/')}${buildHash(row.id, params)}`;
  }
  return row.jsz_url ?? '#';
}

function revisionLink(row: TableRow): CellContent {
  const version = (row.version ?? '').replace(/^nightly$/, '');
  const revision = typeof row.revision === 'string' ? row.revision.slice(0, 8) : undefined;
  const repoSource = row.repository ?? row.github ?? '';
  const repoUrl = repoSource ? repoSource.replace(/\.git$/, '') : '';
  const title = revision && repoUrl ? `${repoUrl} @${revision}` : revision ? `@${revision}` : undefined;

  if (row.revision_date) {
    if (!version || (row.revision && version.includes(row.revision.slice(0, 7)))) {
      return {
        html: row.revision_date,
        title,
      };
    }
    return {
      html: `${row.revision_date} (${version})`,
      title,
    };
  }

  if (version) {
    return {
      html: version,
      title,
    };
  }

  return title ? { title } : {};
}

function renderCell(col: ColumnDef, row: TableRow): CellContent {
  if (col.key === 'engine') {
    const name = row.title ?? row.engine ?? '';
    const variant = row.variant ? `<div class="engine-variant">${row.variant}</div>` : '';
    const link = engineLink(row);
    const revision = revisionLink(row);
    const version = `<div class="engine-version">${revision.html ?? ''}</div>`;

    return {
      html: `
        <div class="engine-cell">
          <div class="engine-name-variant">
            <a href="${link}" class="engine-name" data-engine-id="${row.id ?? ''}">${name}</a>${variant}
          </div>
          ${version}
        </div>
      `,
      title: revision.title,
    };
  }

  if (col.key === 'loc') {
    return formatLoc(row.loc as number | undefined);
  }

  if (col.key === 'binary_size') {
    return formatBinarySize(row.binary_size as number | undefined, row.dist_size as number | undefined);
  }

  if (col.key === 'github_stars') {
    return formatStars(row.github_stars as number | undefined, row.repository as string | undefined, row.github as string | undefined);
  }

  if (col.key === 'github_contributors') {
    return formatStars(row.github_contributors as number | undefined, row.repository as string | undefined, row.github as string | undefined);
  }

  if (col.key === 'license') {
    return formatLicense(row.license as string | undefined, row.license_abbr as string | undefined);
  }

  if (col.key === 'standard') {
    return formatStandard(row.standard as string | undefined);
  }

  if (col.key.startsWith('es') || col.key.startsWith('kangax')) {
    return formatConformance(row[col.key]);
  }

  if (col.key === 'language') {
    return formatLanguage(row.language as string | undefined);
  }

  if (col.key === 'years') {
    return formatYears(row.years as string | undefined);
  }

  if (col.key === 'jit') {
    return formatJit(row.jit as string | undefined);
  }

  if (col.key === 'description') {
    return formatDescription(row);
  }

  if (col.benchmark) {
    return formatBenchmark(row[col.key], row[`${col.key}_detailed`], row[`${col.key}_error`]);
  }

  const value = row[col.key];
  return value ? { text: String(value) } : {};
}

function syncStateFromUrl() {
  hydrated.value = false;
  resetStateFromDefaults(state, ALL_COLUMNS, BENCHMARK_COLUMNS);
  loadStateFromUrl(state, ALL_COLUMNS, BENCHMARK_COLUMNS);
  hydrated.value = true;
}

onMounted(() => {
  syncStateFromUrl();
  window.addEventListener('hashchange', syncStateFromUrl);
  window.addEventListener('popstate', syncStateFromUrl);
  window.addEventListener('scroll', onWindowScroll, { passive: true });
  onWindowScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', syncStateFromUrl);
  window.removeEventListener('popstate', syncStateFromUrl);
  window.removeEventListener('scroll', onWindowScroll);
});

watch(
  state,
  () => {
    if (!hydrated.value) {
      return;
    }
    saveStateToUrl(state, ALL_COLUMNS, BENCHMARK_COLUMNS);
  },
  { deep: true },
);
</script>

<template>
  <section class="jsz-table">
    <EngineTableControls v-if="props.showControls" :state="state" class="table-controls" />

    <div class="table-container" :class="{ 'scrolled-x': hasHorizontalScroll }" @click="onTableClick">
      <div class="table-scroll">
        <table>
        <thead>
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              :class="[columnClasses(col), sortHeaderClass(col)]"
              :title="col.title"
              @click="onHeaderClick(col, $event)"
            >
              {{ col.benchmark ? shortBenchmarkLabel(col.label) : col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in displayRows"
            :key="`${item.row.id ?? item.row.title}-${item.row.variant ?? ''}-${item.row.arch ?? ''}`"
            :data-engine-id="item.row.id ?? ''"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              :class="cellClasses(col, item.cells[col.key])"
            >
              <template v-if="item.cells[col.key].html">
                <span v-html="item.cells[col.key].html" :title="item.cells[col.key].title"></span>
              </template>
              <template v-else>
                <span :title="item.cells[col.key].title">{{ item.cells[col.key].text ?? '' }}</span>
              </template>
            </td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style scoped>
.jsz-table {
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', Helvetica, Arial, sans-serif;
  font-size: 14px;
  width: 100%;
  background-color: var(--bg-primary);
}

.table-controls {
  padding: 8px 16px;
  border-bottom: 1px solid var(--border-light);
  position: sticky;
  top: var(--app-header-height);
  background: color-mix(in srgb, var(--bg-primary) 92%, transparent);
  backdrop-filter: blur(6px);
  z-index: 7;
}

.jsz-table input,
.jsz-table select,
.jsz-table button {
  accent-color: var(--text-accent);
  border: 1px solid var(--border-medium);
  border-radius: 4px;
  background-color: var(--bg-control);
  color: var(--text-primary);
  padding: 4px 6px;
  cursor: pointer;
}

.jsz-table label {
  cursor: pointer;
}

.table-container {
  width: 100%;
  overflow: visible;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  position: relative;
  z-index: 1;
}

.table-scroll {
  overflow: visible;
}

.table-container table {
  border-collapse: collapse;
  border: 0px;
  margin: 0;
  width: 100%;
  min-width: max-content;
}

.table-container th,
.table-container td {
  padding: 10px 12px;
  text-align: left;
  border-bottom: 1px solid var(--border-muted);
  vertical-align: top;
  font-size: 14px;
}

.table-container thead th {
  border-bottom: 0;
}

.table-container th {
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  text-align: left;
  vertical-align: middle;
  color: var(--text-primary);
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 11px;
  padding-top: 14px;
  padding-bottom: 14px;
  background: var(--bg-thead);
  font-family: -apple-system, BlinkMacSystemFont, Inter, ui-sans-serif, system-ui, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

@media (min-width: 721px) {
  .table-container th {
    position: sticky;
    top: var(--app-header-height);
    background: color-mix(in srgb, var(--bg-thead) 78%, transparent);
    backdrop-filter: blur(8px);
    z-index: 5;
    pointer-events: auto;
  }

  .table-container th:first-child {
    position: sticky;
    left: 0;
    z-index: 6;
  }

  .table-container td:first-child {
    position: sticky;
    left: 0;
    z-index: 4;
    background: inherit;
  }

  .table-container.scrolled-x th:first-child,
  .table-container.scrolled-x td:first-child {
    position: sticky;
  }

  .table-container.scrolled-x th:first-child::after,
  .table-container.scrolled-x td:first-child::after {
    content: '';
    position: absolute;
    top: -1px;
    right: -4px;
    width: 4px;
    height: calc(100% + 2px);
    background:
      linear-gradient(
        to right,
        color-mix(in srgb, #000000 40%, transparent),
        color-mix(in srgb, #000000 0%, transparent)
      ),
      linear-gradient(
        to right,
        color-mix(in srgb, #000000 18%, transparent),
        color-mix(in srgb, #000000 0%, transparent)
      );
    z-index: 2;
    pointer-events: none;
  }
}

.table-container th::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: var(--border-muted);
  pointer-events: none;
}

.table-container td.benchmark {
  padding: 8px 4px;
}



.table-container th.numeric {
  text-align: right;
  color: var(--text-primary);
}

.table-container td.numeric {
  text-align: right;
  color: var(--text-numeric);
}


.red,
.special,
.table-container td.special,
.table-container td.numeric.special {
  color: var(--text-red);
}

.hidden {
  display: none;
}

.sorted-column {
  background-color: var(--bg-sorted);
}

.table-container th.sorted-column {
  color: var(--text-primary);
}

.table-container th.sorted-column::before {
  background: var(--text-accent);
  height: 2px;
}

.sort-asc::after,
.sort-desc::after {
  display: inline-block;
  margin-left: 4px;
  font-size: 10px;
  color: var(--text-accent);
  white-space: nowrap;
}

.sort-asc::after {
  content: '▲';
}

.sort-desc::after {
  content: '▼';
}


.engine-cell {
  min-width: 120px;
}

.engine-name-variant {
  white-space: nowrap;
}

:deep(.engine-name) {
  font-weight: 600;
  color: var(--text-accent);
  text-decoration: none;
}

:deep(.engine-name:hover) {
  text-decoration: underline;
  text-decoration-skip-ink: none;
}

:deep(.engine-variant) {
  font-size: 12px;
  padding: 2px 4px;
  border-radius: 6px;
  display: inline-block;
  margin-left: 5px;
  color: var(--bg-primary);
  background-color: var(--text-accent);
}

:deep(.engine-version) {
  color: var(--text-muted);
  font-size: 12px;
  display: block;
}

.description-cell {
  min-width: 300px;
  max-width: 360px;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: anywhere;
}

.license-cell {
  max-width: 100px;
  white-space: nowrap;
}

.missing {
  background-color: var(--bg-missing);
}

.table-container tbody tr:nth-child(odd) td {
  background-color: var(--bg-row-odd);
}

.table-container tbody tr:nth-child(even) td {
  background-color: var(--bg-row-even);
}

.table-container tbody td.sorted-column {
  background-color: var(--bg-sorted) !important;
}

.table-container tbody tr:hover td {
  background-color: var(--bg-hover) !important;
}

@media (max-width: 720px) {
  .table-scroll {
    overflow-x: auto;
    overflow-y: visible;
    max-width: 100%;
    -webkit-overflow-scrolling: touch;
  }

  .table-container th {
    position: static;
  }
}
</style>
