# Wrapper to run js-interpreter with JavaScriptCore shell. Faster than Node/V8.
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-js-interpreter
FROM $BASE

COPY dist.py ./
RUN ./dist.py /dist/js-interpreter_jsc \
      --wrapper='exec "$SCRIPT_DIR"/jsc "$SCRIPT_DIR/js-interpreter" -- "$@"' \
      --dist_files=/dist/js-interpreter \
      console_log=console.log
