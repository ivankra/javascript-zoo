<!-- SPDX-FileCopyrightText: 2026 Ivan Krasilnikov -->
<!-- SPDX-License-Identifier: MIT -->

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  bodyClass?: string;
  padded?: boolean;
}>();

const emit = defineEmits<{
  (event: 'close'): void;
}>();

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
    <div class="base-modal" :class="{ padded: props.padded !== false }" @click.self="emit('close')">
      <slot />
    </div>
  </teleport>
</template>

<style scoped>
.base-modal {
  position: fixed;
  inset: 0;
  background: color-mix(in srgb, var(--bg-primary) 70%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 25;
  overflow: auto;
}

.base-modal.padded {
  padding: 32px 24px;
}

@media (max-width: 720px) {
  .base-modal {
    align-items: stretch;
    height: 100dvh;
    overflow: hidden;
  }

  .base-modal.padded {
    padding: 0;
  }
}
</style>
