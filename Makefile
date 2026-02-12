# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

# GitHub API token (optional for <60 requests/hour)
# GitHub Settings > Developer settings > Personal access tokens
GITHUB_TOKEN := $(shell cat ~/.iac/github-public-token.txt 2>/dev/null || true)

data:
	./update.py --format-markdown $(if $(GITHUB_TOKEN),--github="$(GITHUB_TOKEN)")
	./conformance/results/README-gen.py

node_modules:
	npm install

app: node_modules .PHONY
	npm run build

dev:
	npm run dev

preview:
	npm run preview

.PHONY:
