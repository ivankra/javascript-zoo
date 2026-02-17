#!/bin/bash
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DIST_DIR="$SCRIPT_DIR/twostroke-dist"

export BUNDLE_GEMFILE="$DIST_DIR/Gemfile"
export GEM_HOME="$DIST_DIR/bundle/ruby"/*
export GEM_PATH="$GEM_HOME"
export RUBYLIB="$DIST_DIR/lib:$RUBYLIB"

if [[ "$(uname -m)" == "x86_64" ]]; then
  exec ruby --jit "$DIST_DIR/repl.rb" "$@"
else
  # "RJIT does not support aarch64-linux-gnu yet"
  exec ruby "$DIST_DIR/repl.rb" "$@"
fi

# TODO: try YJIT - needs custom ruby build
