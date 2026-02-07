<!-- SPDX-FileCopyrightText: 2026 Ivan Krasilnikov -->
<!-- SPDX-License-Identifier: MIT -->

<script setup lang="ts">
import { computed, onMounted, onUnmounted, useSlots } from 'vue';

const props = withDefaults(defineProps<{
  bodyClass?: string;
  padded?: boolean;
  panelClass?: string;
  contentClass?: string;
  showClose?: boolean;
}>(), {
  showClose: true,
});

const emit = defineEmits<{
  (event: 'close'): void;
}>();

const slots = useSlots();
const showHeader = computed(() => Boolean(slots.title || slots.actions || props.showClose !== false));

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close');
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
  if (props.bodyClass) {
    document.body.classList.add(props.bodyClass);
  }
});

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown);
  if (props.bodyClass) {
    document.body.classList.remove(props.bodyClass);
  }
});
</script>

<template>
  <teleport to="body">
    <div class="modal-div" :class="{ padded: props.padded !== false }" @click.self="emit('close')">
      <div class="modal-panel" :class="props.panelClass">
        <div v-if="showHeader" class="modal-header">
          <div class="modal-title">
            <slot name="title" />
          </div>
          <div class="modal-actions">
            <slot name="actions" />
            <button
              v-if="props.showClose !== false"
              type="button"
              class="modal-close"
              aria-label="Close"
              title="Close"
              @click="emit('close')"
            >
              ×
            </button>
          </div>
        </div>
        <div class="modal-body" :class="props.contentClass">
          <slot />
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.modal-div {
  position: fixed;
  inset: 0;
  background: color-mix(in srgb, var(--bg-primary) 70%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 25;
  overflow: auto;
}

.modal-div.padded {
  padding: 32px 24px;
}

.modal-panel {
  display: flex;
  flex-direction: column;
  max-width: 100%;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.modal-title {
  min-width: 0;
  flex: 1 1 auto;
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, Inter, ui-sans-serif, system-ui, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  font-weight: 600;
  font-size: 16px;
}

.modal-actions {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.modal-body {
  min-height: 0;
  overflow: auto;
}

.modal-close {
  border: 1px solid var(--border-light);
  background: var(--bg-control);
  color: var(--text-primary);
  border-radius: 6px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
}

.modal-close:hover {
  background: var(--bg-hover);
}

@media (max-width: 720px) {
  .modal-div {
    align-items: stretch;
    height: 100dvh;
    overflow: hidden;
  }

  .modal-div.padded {
    padding: 0;
  }

  .modal-panel {
    width: 100%;
    max-height: 100dvh;
    height: 100dvh;
    border-radius: 0;
  }

  .modal-header {
    padding: 16px;
  }

  .modal-body {
    padding: 16px;
  }
}
</style>
