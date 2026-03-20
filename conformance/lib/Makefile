# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

all: unittest mypy

unittest:
	cd ../.. && python3 -m unittest -v \
	  conformance.lib.config_test \
	  conformance.lib.classifier_test \
	  conformance.lib.frontmatter_test \
	  conformance.lib.runner_test

mypy:
	cd ../.. && python3 -m mypy conformance/lib/*.py
