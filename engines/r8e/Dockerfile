# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/lightshell-dev/r8e.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

COPY engines/r8e/r8e.c /tmp/r8e.c

RUN SRCS=' \
      src/r8e_api.c \
      src/r8e_value.c \
      src/r8e_alloc.c \
      src/r8e_number.c \
      src/r8e_string.c \
      src/r8e_atom.c \
      src/r8e_parse.c \
      src/r8e_interp.c \
      src/r8e_object.c \
      src/r8e_array.c \
      src/r8e_function.c \
      src/r8e_closure.c \
      src/r8e_gc.c \
      src/r8e_regexp.c \
      src/r8e_error.c \
      src/r8e_module.c \
      src/r8e_builtin.c \
      src/r8e_json.c \
      src/r8e_promise.c \
      src/r8e_iterator.c \
      src/r8e_proxy.c \
      src/r8e_weakref.c \
      src/r8e_raf.c \
      src/r8e_font.c \
      src/security/r8e_arena.c \
      src/security/r8e_verify.c \
      src/security/r8e_realm.c \
      src/security/r8e_capability.c \
      src/ui/r8e_dom.c \
      src/ui/r8e_dom_bridge.c \
      src/ui/r8e_style.c \
      src/ui/r8e_layout.c \
      src/ui/r8e_paint.c \
      src/ui/r8e_event.c \
      src/gpu/r8e_display_list.c \
      src/ai/primitives/r8e_sse_parser.c \
      src/ai/primitives/r8e_schema_validator.c \
      src/ai/primitives/r8e_agent.c \
      src/ai/primitives/r8e_conversations.c \
      src/ai/r8e_gguf.c \
      src/ai/r8e_tokenizer.c \
      src/ai/r8e_sampler.c \
      src/ai/r8e_kvcache.c \
      src/ai/r8e_chat_template.c \
      src/mcp/r8e_jsonrpc.c \
      src/mcp/r8e_mcp_stdio.c \
      src/mcp/r8e_mcp_session.c \
    ' && \
    ${CC:-cc} -D_GNU_SOURCE -std=c11 -O2 -Wall -Wextra -Wpedantic \
      -Wno-unused-parameter -fno-strict-aliasing -Iinclude \
      /tmp/r8e.c $SRCS -lm -o /src/r8e

COPY build/dist.py ./
RUN ./dist.py /dist/r8e --binary=/src/r8e --no-license
