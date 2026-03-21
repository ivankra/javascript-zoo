# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

all: mypy gen

gen:
	./gen-octane.sh

clean:
	./gen-octane.sh --clean

mypy:
	cd .. && python3 -m mypy bench/bench.py
	cd .. && python3 -m mypy --ignore-missing-imports bench/compare.py

sh:
	make -C ../build sh JSZ_RUNTIME_CWD=/zoo/bench
