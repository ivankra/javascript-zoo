# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

all: unittest mypy

unittest:
	cd .. && python3 -m unittest -v harness/*_test.py

mypy:
	cd .. && python3 -m mypy harness/*.py
