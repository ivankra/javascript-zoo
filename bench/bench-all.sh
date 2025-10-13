#!/bin/bash
# Benchmarks all engines in /dist

if ! [[ -d /dist ]]; then
  echo "Error: /dist doesn't exists"
  echo "Run this script inside test container (cd docker && make sh)"
  exit 1
fi
