<!-- SPDX-FileCopyrightText: 2026 Ivan Krasilnikov -->
<!-- SPDX-License-Identifier: MIT -->

<script setup lang="ts">
import { computed } from 'vue';
import MarkdownIt from 'markdown-it';
import GitHubIcon from './GitHubIcon.vue';
import Modal from './Modal.vue';
import { buildHash, parseHashLocation } from './state';

const props = defineProps<{ engine: Record<string, unknown>; markdown: string }>();
const emit = defineEmits<{
  (event: 'close'): void;
  (event: 'open-engine', id: string): void;
}>();

const markdownBase = 'https://github.com/ivankra/javascript-zoo/blob/master/engines/';
const markdown = new MarkdownIt({ html: true, linkify: true });
const defaultLinkOpen = markdown.renderer.rules.link_open ?? ((tokens, idx, options, _env, self) => {
  return self.renderToken(tokens, idx, options);
});

markdown.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const href = token.attrGet('href') ?? '';
  const rawHref = href.trim();
  const isRelative = rawHref !== '' && !/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(rawHref) && !rawHref.startsWith('/');
  if (isRelative) {
    const engineMatch = rawHref.match(/^([^/]+)\.md(?:[?#].*)?$/);
    if (engineMatch) {
      token.attrSet('data-engine-id', engineMatch[1]);
      const params = typeof window === 'undefined' ? new URLSearchParams() : parseHashLocation().params;
      token.attrSet('href', buildHash(engineMatch[1], params));
    } else {
      token.attrSet('href', new URL(rawHref, markdownBase).toString());
      token.attrSet('target', '_blank');
      token.attrSet('rel', 'noreferrer');
    }
  }
  return defaultLinkOpen(tokens, idx, options, env, self);
};

const engineId = computed(() => (typeof props.engine.id === 'string' ? props.engine.id : ''));
const engineTitle = computed(() => {
  if (typeof props.engine.title === 'string') {
    return props.engine.title;
  }
  return engineId.value || 'Engine details';
});
const engineLink = computed(() => {
  if (!engineId.value) {
    return '#';
  }
  return `https://github.com/ivankra/javascript-zoo/blob/master/engines/${engineId.value}.md`;
});

const renderedMarkdown = computed(() => {
  const html = markdown.render(props.markdown ?? '');
  const stripped = html.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '');
  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return stripped;
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(stripped, 'text/html');
  const links = Array.from(doc.querySelectorAll('a[href]'));
  for (const link of links) {
    const rawHref = (link.getAttribute('href') ?? '').trim();
    if (!rawHref) {
      continue;
    }
    const isRelative = !/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(rawHref) && !rawHref.startsWith('/');
    if (!isRelative) {
      continue;
    }
    if (rawHref.startsWith('#') || link.hasAttribute('data-engine-id')) {
      continue;
    }
    const engineMatch = rawHref.match(/^([^/]+)\.md(?:[?#].*)?$/);
    if (engineMatch) {
      link.setAttribute('data-engine-id', engineMatch[1]);
      const params = typeof window === 'undefined' ? new URLSearchParams() : parseHashLocation().params;
      link.setAttribute('href', buildHash(engineMatch[1], params));
      link.removeAttribute('target');
      link.removeAttribute('rel');
    } else {
      link.setAttribute('href', new URL(rawHref, markdownBase).toString());
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noreferrer');
    }
  }
  return doc.body.innerHTML;
});

function closeModal() {
  emit('close');
}

function onMarkdownClick(event: MouseEvent) {
  const target = event.target as HTMLElement | null;
  if (!target) {
    return;
  }
  const link = target.closest('a') as HTMLAnchorElement | null;
  if (!link) {
    return;
  }
  const engineId = link.dataset.engineId;
  if (!engineId) {
    return;
  }
  event.preventDefault();
  emit('open-engine', engineId);
}
</script>

<template>
  <Modal body-class="modal-open" @close="closeModal" padded>
    <div class="engine-dialog">
      <div class="engine-dialog-header">
        <div class="engine-dialog-title">{{ engineTitle }}</div>
        <div class="engine-dialog-actions">
          <a
            class="engine-dialog-link"
            :href="engineLink"
            target="_blank"
            rel="noreferrer"
            aria-label="View on GitHub"
            title="View on GitHub"
          >
            <GitHubIcon :size="18" />
          </a>
          <button type="button" class="close-button" @click="closeModal" aria-label="Close" title="Close">×</button>
        </div>
      </div>
      <div class="engine-dialog-body">
        <div class="markdown-body" v-html="renderedMarkdown" @click="onMarkdownClick"></div>
      </div>
    </div>
  </Modal>
</template>

<style scoped>
.engine-dialog {
  position: relative;
  width: min(960px, 100%);
  max-height: calc(100vh - 128px);
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  box-shadow:
    0 24px 60px color-mix(in srgb, var(--border-medium) 50%, transparent),
    0 6px 18px color-mix(in srgb, var(--border-medium) 40%, transparent);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.engine-dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px 12px;
  border-bottom: 1px solid var(--border-light);
}

.engine-dialog-actions {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.engine-dialog-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: var(--text-primary);
  text-decoration: none;
}

.engine-dialog-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
  font-family: -apple-system, BlinkMacSystemFont, Inter, ui-sans-serif, system-ui, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

.engine-dialog-body {
  padding: 20px 24px 24px;
  overflow: auto;
}

.close-button {
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

.close-button:hover {
  background: var(--bg-hover);
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4) {
  margin-top: 20px;
  color: var(--text-primary);
}

.markdown-body {
  min-height: 40px;
}

.markdown-body :deep(p),
.markdown-body :deep(li) {
  line-height: 1.6;
}

.markdown-body :deep(code) {
  background: var(--bg-muted);
  padding: 2px 4px;
  border-radius: 4px;
}

.markdown-body :deep(pre) {
  background: var(--bg-muted);
  padding: 12px;
  border-radius: 8px;
  overflow: auto;
}

.markdown-body :deep(details) {
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 8px 12px;
}

.markdown-body :deep(summary) {
  cursor: pointer;
  font-weight: 600;
}

@media (max-width: 720px) {
  .engine-dialog {
    width: 100%;
    max-height: 100dvh;
    height: 100dvh;
    border-radius: 0;
  }

  .engine-dialog-header {
    padding: 16px 16px 12px;
  }

  .engine-dialog-body {
    padding: 16px;
  }
}
</style>
