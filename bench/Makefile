# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

all: lint gen

gen:
	./gen-octane.sh

clean:
	./gen-octane.sh --clean

lint:
	mypy bench
	mypy --ignore-missing-imports compare
