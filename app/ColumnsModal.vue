<!-- SPDX-FileCopyrightText: 2026 Ivan Krasilnikov -->
<!-- SPDX-License-Identifier: MIT -->

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ALL_COLUMNS, BENCHMARK_COLUMNS } from './columns';
import { resetColumnSelection } from './state';
import type { ColumnDef } from './columns';
import type { TableState } from './state';
import Modal from './Modal.vue';

const props = defineProps<{ state: TableState }>();
const emit = defineEmits<{
  (event: 'close'): void;
}>();

const draggingKey = ref<string | null>(null);
const dragOverKey = ref<string | null>(null);
const dragOverPosition = ref<'before' | 'after' | null>(null);
const suppressLabelClick = ref(false);

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

function moveColumn(fromKey: string, toKey: string, position: 'before' | 'after') {
  if (fromKey === toKey) {
    return;
  }
  const order = [...props.state.columnOrder];
  const fromIndex = order.indexOf(fromKey);
  const toIndex = order.indexOf(toKey);
  if (fromIndex === -1 || toIndex === -1) {
    return;
  }
  const insertIndex = position === 'after' ? toIndex + 1 : toIndex;
  order.splice(fromIndex, 1);
  const adjustedIndex = fromIndex < insertIndex ? insertIndex - 1 : insertIndex;
  order.splice(adjustedIndex, 0, fromKey);
  props.state.columnOrder = order;
}

function onPointerDown(event: PointerEvent, key: string) {
  const target = event.target as HTMLElement | null;
  if (!target) {
    return;
  }
  event.preventDefault();
  target.setPointerCapture(event.pointerId);
  let started = false;
  const startX = event.clientX;
  const startY = event.clientY;
  let dropKey: string | null = null;
  const originKey = key;

  const onPointerMove = (moveEvent: PointerEvent) => {
    const delta = Math.hypot(moveEvent.clientX - startX, moveEvent.clientY - startY);
    if (!started && delta > 4) {
      started = true;
      suppressLabelClick.value = true;
      draggingKey.value = originKey;
    }
    if (!started) {
      return;
    }
    const element = document.elementFromPoint(moveEvent.clientX, moveEvent.clientY);
    const row = element?.closest<HTMLTableRowElement>('tr[data-column-key]');
    const nextKey = row?.dataset.columnKey;
    if (nextKey && row) {
      const rect = row.getBoundingClientRect();
      const relY = moveEvent.clientY - rect.top;
      const midpoint = rect.height / 2;
      const deadZone = 6;
      let nextPosition = dragOverPosition.value;
      if (relY < midpoint - deadZone) {
        nextPosition = 'before';
      } else if (relY > midpoint + deadZone) {
        nextPosition = 'after';
      }
      if (dragOverKey.value !== nextKey || dragOverPosition.value !== nextPosition) {
        dragOverKey.value = nextKey;
        dragOverPosition.value = nextPosition;
      }
      dropKey = nextKey;
    } else {
      dragOverKey.value = null;
      dragOverPosition.value = null;
      dropKey = null;
    }
  };

  const onPointerUp = () => {
    target.releasePointerCapture(event.pointerId);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointercancel', onPointerUp);
    if (started && dropKey && dropKey !== originKey && dragOverPosition.value) {
      moveColumn(originKey, dropKey, dragOverPosition.value);
    }
    draggingKey.value = null;
    dragOverKey.value = null;
    dragOverPosition.value = null;
    suppressLabelClick.value = false;
  };

  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);
}

function onLabelClick(event: MouseEvent) {
  if (suppressLabelClick.value) {
    event.preventDefault();
    event.stopPropagation();
  }
}

function closeModal() {
  emit('close');
}

function resetColumns() {
  resetColumnSelection(props.state, ALL_COLUMNS, BENCHMARK_COLUMNS);
}

</script>

<template>
  <Modal body-class="columns-modal-open" @close="closeModal" padded>
    <div class="columns-dialog">
      <div class="columns-header">
        <div class="columns-title">Select columns</div>
        <div class="columns-actions">
          <button type="button" class="reset-button header-button" @click="resetColumns">Reset</button>
          <button
            type="button"
            class="close-button header-button"
            @click="closeModal"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      </div>
      <div class="columns-body">
        <section class="columns-section">
          <table class="columns-table">
            <tbody>
              <tr
                v-for="col in baseColumns"
                :key="col.key"
                :data-column-key="col.key"
                :class="{
                  dragging: draggingKey === col.key,
                  'over-before': dragOverKey === col.key && dragOverPosition === 'before',
                  'over-after': dragOverKey === col.key && dragOverPosition === 'after',
                }"
              >
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
                    <label
                      class="col-label draggable"
                      :for="`col-${col.key}`"
                      @pointerdown="onPointerDown($event, col.key)"
                      @click="onLabelClick"
                    >
                      {{ col.label }}
                    </label>
                </td>
                <td class="col-desc">
                  <label class="col-label" :for="`col-${col.key}`">{{ col.title ?? '' }}</label>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="columns-note">Drag column titles to reorder.</div>
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
      </div>
    </div>
  </Modal>
</template>

<style scoped>
.columns-dialog {
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

.columns-header {
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

.columns-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, Inter, ui-sans-serif, system-ui, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

.columns-body {
  padding: 16px 20px 20px;
  display: grid;
  gap: 20px;
  overflow: auto;
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

.col-label.draggable {
  cursor: grab;
  touch-action: none;
}

.columns-table tr.dragging {
  background: color-mix(in srgb, var(--text-accent) 8%, transparent);
}

.columns-table tr.dragging td {
  position: relative;
}

.columns-table tr.dragging td::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-top: 1px dashed color-mix(in srgb, var(--text-accent) 70%, transparent);
  border-bottom: 1px dashed color-mix(in srgb, var(--text-accent) 70%, transparent);
  pointer-events: none;
}

.columns-table tr.dragging td:first-child::after {
  border-left: 1px dashed color-mix(in srgb, var(--text-accent) 70%, transparent);
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.columns-table tr.dragging td:last-child::after {
  border-right: 1px dashed color-mix(in srgb, var(--text-accent) 70%, transparent);
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.columns-table tr.over-before td {
  box-shadow: inset 0 2px 0 var(--text-accent);
}

.columns-table tr.over-after td {
  box-shadow: inset 0 -2px 0 var(--text-accent);
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

.close-button {
  width: 32px;
  font-size: 18px;
  line-height: 1;
}

.header-button:hover {
  background: var(--bg-hover);
}

@media (max-width: 720px) {
  .columns-dialog {
    width: 100%;
    max-height: 100dvh;
    height: 100dvh;
    border-radius: 0;
  }

  .columns-header {
    padding: 16px;
  }

  .columns-body {
    padding: 16px;
  }
}
</style>
