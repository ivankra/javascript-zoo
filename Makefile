# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

# GitHub API token (optional for <60 requests/hour)
# GitHub Settings > Developer settings > Personal access tokens
GITHUB_TOKEN := $(shell cat ~/.iac/github-public-token.txt 2>/dev/null || true)

all: npm-install data app

npm-install:
	npm install

data:
	./update.py --format-markdown $(if $(GITHUB_TOKEN),--github="$(GITHUB_TOKEN)")
	./conformance/results/README-gen.py

app: .PHONY
	npm run app:build

app-dev:
	npm run app:dev

app-preview:
	npm run app:preview

.PHONY:
