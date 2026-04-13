# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

all: mypy gen

gen:
	./gen-octane.sh

clean:
	./gen-octane.sh --clean

sh:
	make -C ../build sh JSZ_RUNTIME_CWD=/zoo/bench
