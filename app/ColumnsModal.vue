<!-- SPDX-FileCopyrightText: 2026 Ivan Krasilnikov -->
<!-- SPDX-License-Identifier: MIT -->

<script setup lang="ts">
import { computed } from 'vue';
import { ALL_COLUMNS, BENCHMARK_COLUMNS } from './columns';
import { resetColumnSelection } from './tableState';
import type { ColumnDef } from './columns';
import type { TableState } from './tableState';
import Modal from './Modal.vue';

const props = defineProps<{ state: TableState }>();
const emit = defineEmits<{
  (event: 'close'): void;
}>();

const baseColumns = computed<ColumnDef[]>(() => {
  const base = ALL_COLUMNS.filter((col) => !col.benchmark && col.key !== 'engine');
  const map = new Map(base.map((col) => [col.key, col]));
  const ordered: ColumnDef[] = [];
  for (const key of props.state.columnOrder) {
    const col = map.get(key);
    if (col) {
      ordered.push(col);
    }
  }
  for (const col of base) {
    if (!ordered.includes(col)) {
      ordered.push(col);
    }
  }
  return ordered;
});


const v8PresetActive = computed(() => {
  return BENCHMARK_COLUMNS.every((col) => {
    const visible = Boolean(props.state.visibleColumns[col.key]);
    return col.v8 ? visible : !visible;
  });
});

const allPresetActive = computed(() => {
  return BENCHMARK_COLUMNS.every((col) => Boolean(props.state.visibleColumns[col.key]));
});

function applyBenchmarkPreset(preset: 'v8' | 'all') {
  if (preset === 'v8') {
    for (const col of BENCHMARK_COLUMNS) {
      props.state.visibleColumns[col.key] = Boolean(col.v8);
    }
    return;
  }
  for (const col of BENCHMARK_COLUMNS) {
    props.state.visibleColumns[col.key] = true;
  }
}

function closeModal() {
  emit('close');
}

function resetColumns() {
  resetColumnSelection(props.state);
}

</script>

<template>
  <Modal
    body-class="columns-modal-open"
    panel-class="columns-dialog"
    content-class="columns-body"
    @close="closeModal"
    padded
  >
    <template #title>
      Select columns
    </template>
    <template #actions>
      <div class="columns-actions">
        <button type="button" class="reset-button header-button" @click="resetColumns">Reset</button>
      </div>
    </template>
    <section class="columns-section">
      <table class="columns-table">
        <tbody>
          <tr v-for="col in baseColumns" :key="col.key">
            <td class="col-check">
              <div class="check-wrap">
                <input
                  :id="`col-${col.key}`"
                  type="checkbox"
                  :checked="props.state.visibleColumns[col.key]"
                  @change="props.state.visibleColumns[col.key] = ($event.target as HTMLInputElement).checked"
                />
              </div>
            </td>
            <td class="col-name">
              <label class="col-label" :for="`col-${col.key}`">
                {{ col.label }}
              </label>
            </td>
            <td class="col-desc">
              <label class="col-label" :for="`col-${col.key}`">{{ col.title ?? '' }}</label>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="columns-section">
      <div class="section-title">Benchmarks</div>
      <div class="preset-row">
        <button
          class="menu-button"
          :class="{ active: v8PresetActive }"
          type="button"
          title="Select only v8-v7 benchmarks"
          @click="applyBenchmarkPreset('v8')"
        >
          v8-v7
        </button>
        <button
          class="menu-button"
          :class="{ active: allPresetActive }"
          type="button"
          title="Select all benchmarks (v8-v9)"
          @click="applyBenchmarkPreset('all')"
        >
          v8-v9
        </button>
      </div>
      <table class="columns-table">
        <tbody>
          <tr v-for="col in BENCHMARK_COLUMNS" :key="col.key">
            <td class="col-check">
              <input
                :id="`bench-${col.key}`"
                type="checkbox"
                :checked="props.state.visibleColumns[col.key]"
                @change="props.state.visibleColumns[col.key] = ($event.target as HTMLInputElement).checked"
              />
            </td>
            <td class="col-name">
              <label class="col-label" :for="`bench-${col.key}`">{{ col.label }}</label>
            </td>
            <td class="col-desc">
              <label class="col-label" :for="`bench-${col.key}`">{{ col.title ?? '' }}</label>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="columns-note">
        "Score" column is automatically recomputed as geometric mean of selected benchmarks.
      </div>
    </section>
  </Modal>
</template>

<style scoped>
:global(.columns-dialog) {
  width: min(640px, 100%);
  max-height: calc(100vh - 96px);
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  box-shadow:
    0 20px 50px color-mix(in srgb, var(--border-medium) 50%, transparent),
    0 6px 16px color-mix(in srgb, var(--border-medium) 40%, transparent);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

:global(.columns-dialog .modal-header) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 12px;
  border-bottom: 1px solid var(--border-light);
}

.columns-actions {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

:global(.columns-dialog .columns-body) {
  padding: 16px 20px 20px;
  display: grid;
  gap: 20px;
  user-select: none;
}

.columns-section {
  display: grid;
  gap: 10px;
}

.section-title {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-family: -apple-system, BlinkMacSystemFont, Inter, ui-sans-serif, system-ui, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

.columns-table {
  width: 100%;
  border-collapse: collapse;
}

.columns-table td {
  padding: 6px 0;
  vertical-align: top;
  font-size: 13px;
  color: var(--text-primary);
}

.col-check {
  width: 28px;
}

.check-wrap {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.check-wrap input {
  margin-top: 2px;
}

.col-name {
  width: 20%;
  font-weight: 500;
  padding-right: 12px;
}

.col-desc {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.4;
}

.col-label {
  cursor: pointer;
  display: block;
}

.columns-note {
  font-size: 12px;
  color: var(--text-primary);
  line-height: 1.4;
}


.preset-row {
  display: flex;
  gap: 8px;
}

.menu-button {
  border: 1px solid var(--border-light);
  background: var(--bg-control);
  color: var(--text-primary);
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 12px;
  text-transform: none;
  letter-spacing: 0;
}

.menu-button:hover {
  background: var(--bg-hover);
}

.menu-button.active {
  border-color: var(--text-accent);
  color: var(--text-primary);
}

:global(.dark) .menu-button.active {
  background: var(--bg-control);
}

.header-button {
  border: 1px solid var(--border-light);
  background: var(--bg-control);
  color: var(--text-primary);
  border-radius: 6px;
  height: 32px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.reset-button {
  padding: 0 12px;
  font-size: 12px;
}

.header-button:hover {
  background: var(--bg-hover);
}

:global(body.columns-modal-open) {
  overflow: hidden;
}

@media (max-width: 720px) {
  :global(body.columns-modal-open) .app-header,
  :global(body.columns-modal-open) .app-body {
    display: none;
  }
}

</style>
