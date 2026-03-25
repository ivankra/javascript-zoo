#!/usr/bin/env python3.10
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

import sys

import js2py


def main() -> None:
    engine = js2py.EvalJs()
    if len(sys.argv) <= 1:
        engine.console()
        return

    for filename in sys.argv[1:]:
        with open(filename, encoding="utf-8") as f:
            engine.execute(f.read())


if __name__ == "__main__":
    main()
