<!-- SPDX-FileCopyrightText: 2026 Ivan Krasilnikov -->
<!-- SPDX-License-Identifier: MIT -->

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import Controls from './Controls.vue';
import TableView from './TableView.vue';
import * as tableState from './tableState';
import MarkdownModal from './MarkdownModal.vue';
import ColumnsModal from './ColumnsModal.vue';
import { enginesData, getMarkdownPage, hasMarkdownPage } from './data';
import type { EngineEntry } from './data';

const state = reactive(tableState.createInitialState());
const darkTheme = ref(false);
const columnsModalOpen = ref(false);
const markdownModalOpen = ref(false);
const markdownPage = ref<string | null>(null);
const markdownPageText = computed(() => getMarkdownPage(markdownPage.value));
const engines = ref(enginesData as EngineEntry[]);
const hydrated = ref(false);
const tableViewRef = ref<{ exportCsv: () => void } | null>(null);

function withBase(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  if (base === '/') {
    return path;
  }
  return base.replace(/\/$/, '') + path;
}

function buildEngineLink(id: string): string {
  return `${withBase('/')}${tableState.buildPageHash(id)}`;
}

function onLocationChange() {
  const { page, params } = tableState.parseHashLocation();

  if (page === 'columns') {
    columnsModalOpen.value = true;
    markdownPage.value = null;
    markdownModalOpen.value = false;
  } else {
    columnsModalOpen.value = false;
    markdownPage.value = page ?? null;
    markdownModalOpen.value = Boolean(page && hasMarkdownPage(page));
  }

  if (page || !params.toString()) {
    hydrated.value = true;
    return;
  }
  hydrated.value = false;
  tableState.resetStateFromDefaults(state);
  tableState.loadStateFromUrl(state);
  hydrated.value = true;
}

function setTheme(next: boolean) {
  darkTheme.value = next;
  document.documentElement.classList.toggle('dark', next);
  localStorage.setItem('theme', next ? 'dark' : 'light');
}

function openEngine(id: string) {
  if (!hasMarkdownPage(id)) {
    return;
  }
  columnsModalOpen.value = false;
  markdownPage.value = id;
  markdownModalOpen.value = true;
  const nextHash = tableState.buildPageHash(id);
  window.history.pushState(null, '', `${withBase('/')}${nextHash}`);
}

function closeEngine() {
  markdownPage.value = null;
  markdownModalOpen.value = false;
  const nextHash = tableState.buildStateHash(state);
  window.history.pushState(null, '', `${withBase('/')}${nextHash}`);
}

function openColumns() {
  columnsModalOpen.value = true;
  markdownPage.value = null;
  markdownModalOpen.value = false;
  const nextHash = tableState.buildPageHash('columns');
  window.history.pushState(null, '', `${withBase('/')}${nextHash}`);
  nextTick(() => {
    window.dispatchEvent(new Event('resize'));
  });
}

function closeColumns() {
  columnsModalOpen.value = false;
  const nextHash = tableState.buildStateHash(state);
  window.history.pushState(null, '', `${withBase('/')}${nextHash}`);
  nextTick(() => {
    window.dispatchEvent(new Event('resize'));
  });
}

function exportCsv() {
  tableViewRef.value?.exportCsv();
}

onMounted(() => {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') {
    setTheme(stored === 'dark');
  } else {
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    setTheme(Boolean(prefersDark));
  }

  window.addEventListener('popstate', onLocationChange);
  window.addEventListener('hashchange', onLocationChange);
  onLocationChange();
});

onUnmounted(() => {
  window.removeEventListener('popstate', onLocationChange);
  window.removeEventListener('hashchange', onLocationChange);
});

watch(
  state,
  () => {
    if (!hydrated.value) {
      return;
    }
    tableState.saveStateToUrl(state);
  },
  { deep: true },
);

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
          <Controls
            :state="state"
            :dark-theme="darkTheme"
            :set-theme="setTheme"
            @open-columns="openColumns"
            @export-csv="exportCsv"
          />
        </div>
      </div>
    </header>
    <section class="app-body" :class="{ hidden: markdownModalOpen || columnsModalOpen }">
      <TableView
        ref="tableViewRef"
        :state="state"
        :engines="engines"
        :engine-link="buildEngineLink"
        @select-engine="openEngine"
      />
    </section>
    <MarkdownModal
      v-if="markdownModalOpen && markdownPage && hasMarkdownPage(markdownPage)"
      :engine-id="markdownPage"
      :markdown="markdownPageText"
      @close="closeEngine"
      @open-engine="openEngine"
    />
    <ColumnsModal v-if="columnsModalOpen" :state="state" @close="closeColumns" />
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
