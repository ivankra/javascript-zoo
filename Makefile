# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

data: .PHONY
	./build/parse_markdown.py -o data/markdown.json --bundle data/markdown-bundle.json
	./build/update_github.py -o data/github.json
	./build/update_markdown.py
	./build/update_data.py -o data/engines.json

node_modules:
	npm install

app: node_modules .PHONY
	npm run build

dev:
	npm run dev

preview:
	npm run preview

mypy:
	make -C harness mypy
	make -C build mypy

sh:
	make -C build sh

.PHONY:
