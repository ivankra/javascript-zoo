<!-- SPDX-FileCopyrightText: 2026 Ivan Krasilnikov -->
<!-- SPDX-License-Identifier: MIT -->

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, reactive, ref } from 'vue';
import EngineTable from './EngineTable.vue';
import EngineTableControls from './EngineTableControls.vue';
import {
  buildHash,
  createInitialState,
  initColumnOrder,
  initVisibleColumns,
  parseHashLocation,
  withBase,
} from './state';
import { ALL_COLUMNS } from './columns';
import MarkdownModal from './MarkdownModal.vue';
import ColumnsModal from './ColumnsModal.vue';
import enginesData from '../dist/engines.json';
import markdownData from '../dist/markdown.json';
import type { EngineEntry } from './data';

const theme = ref<'light' | 'dark'>('light');
const state = reactive(createInitialState());
const selectedEngineId = ref<string | null>(null);
const columnsOpen = ref(false);
const engines = ref(enginesData as EngineEntry[]);
const markdownMap = ref(markdownData as Record<string, string>);

initVisibleColumns(state, ALL_COLUMNS);
initColumnOrder(state, ALL_COLUMNS);

const engineMap = computed(() => {
  const map = new Map<string, Record<string, unknown>>();
  for (const row of engines.value as Record<string, unknown>[]) {
    if (typeof row.id === 'string') {
      map.set(row.id, row);
    }
  }
  return map;
});

const selectedEngine = computed(() => {
  if (!selectedEngineId.value) {
    return null;
  }
  return engineMap.value.get(selectedEngineId.value) ?? null;
});

const selectedMarkdown = computed(() => {
  if (!selectedEngineId.value) {
    return '';
  }
  return markdownMap.value[`engines/${selectedEngineId.value}.md`] ?? '';
});

function syncFromLocation() {
  const { page } = parseHashLocation();
  if (page === 'columns') {
    columnsOpen.value = true;
    selectedEngineId.value = null;
    return;
  }
  columnsOpen.value = false;
  selectedEngineId.value = page ?? null;
}

function applyTheme(next: 'light' | 'dark') {
  theme.value = next;
  document.documentElement.classList.toggle('dark', next === 'dark');
  localStorage.setItem('theme', next);
}

function toggleTheme() {
  applyTheme(theme.value === 'dark' ? 'light' : 'dark');
}

function openEngine(id: string) {
  if (!engineMap.value.has(id)) {
    return;
  }
  columnsOpen.value = false;
  selectedEngineId.value = id;
  const { params } = parseHashLocation();
  const nextHash = buildHash(id, params);
  window.history.pushState(null, '', `${withBase('/')}${nextHash}`);
}

function closeEngine() {
  selectedEngineId.value = null;
  const { params } = parseHashLocation();
  const nextHash = buildHash(null, params);
  window.history.pushState(null, '', `${withBase('/')}${nextHash}`);
}

function openColumns() {
  columnsOpen.value = true;
  selectedEngineId.value = null;
  const { params } = parseHashLocation();
  const nextHash = buildHash('columns', params);
  window.history.pushState(null, '', `${withBase('/')}${nextHash}`);
  nextTick(() => {
    window.dispatchEvent(new Event('resize'));
  });
}

function closeColumns() {
  columnsOpen.value = false;
  const { params } = parseHashLocation();
  const nextHash = buildHash(null, params);
  window.history.pushState(null, '', `${withBase('/')}${nextHash}`);
  nextTick(() => {
    window.dispatchEvent(new Event('resize'));
  });
}

onMounted(() => {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') {
    applyTheme(stored);
  } else {
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  window.addEventListener('popstate', syncFromLocation);
  window.addEventListener('hashchange', syncFromLocation);
  syncFromLocation();
});

onUnmounted(() => {
  window.removeEventListener('popstate', syncFromLocation);
  window.removeEventListener('hashchange', syncFromLocation);
});
</script>

<template>
  <main class="app">
    <header class="app-header">
      <div class="title-row">
        <a
          class="app-title-link"
          href="https://github.com/ivankra/javascript-zoo"
          target="_blank"
        >
          JavaScript engines zoo
        </a>
        <div class="header-actions">
          <EngineTableControls
            :state="state"
            :engines="engines"
            :theme="theme"
            :toggle-theme="toggleTheme"
            :show-theme="true"
            @open-columns="openColumns"
          />
        </div>
      </div>
    </header>
    <section class="app-body" :class="{ hidden: selectedEngine || columnsOpen }">
      <EngineTable
        :state="state"
        :engines="engines"
        :show-controls="false"
        @select-engine="openEngine"
      />
    </section>
    <MarkdownModal
      v-if="selectedEngine"
      :engine="selectedEngine"
      :markdown="selectedMarkdown"
      @close="closeEngine"
      @open-engine="openEngine"
    />
    <ColumnsModal v-if="columnsOpen" :state="state" @close="closeColumns" />
  </main>
</template>

<style scoped>
.app {
  background: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
}

.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  height: var(--app-header-height);
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-light);
  background: var(--bg-header);
  z-index: 10;
  box-sizing: border-box;
}

.app-body {
  padding-top: var(--app-header-height);
}


.title-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  margin-left: auto;
  flex: 1 1 auto;
  justify-content: flex-end;
}

.app-title-link {
  margin: 0;
  color: var(--text-accent);
  font-size: 16px;
  line-height: 1.2;
  letter-spacing: 0.02em;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, Inter, ui-sans-serif, system-ui, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  text-decoration: none;
}

.app-title-link:hover {
  text-decoration: underline;
}

.app-body.hidden {
  display: none;
}

@media (min-width: 721px) {
  .app-body.hidden {
    display: block;
  }
}

</style>
