#!/bin/bash

if [[ -z "$1" ]]; then
  echo "Usage: $0 <path to master worktree>"
  exit 1
fi

rm -rf assets index.html favicon.svg engines.json markdown.json

set -ex
cp "$1"/dist/markdown.json ./
cp "$1"/dist/engines.json ./
cp -r "$1"/dist/app/* ./

[[ -f favicon.ico ]] || convert -background none favicon.svg -define icon:auto-resize=48,32,16 favicon.ico
