# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

all: unittest mypy

unittest:
	python3 -m unittest -v lib_test.py

mypy:
	python3 -m mypy lib.py lib_test.py
