# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-zig
FROM $BASE

ARG REPO=https://codeberg.org/kiesel-js/kiesel.git
ARG REV=main

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

RUN case "$(dpkg --print-architecture 2>/dev/null || true)" in \
      # Target generic ARMv8 - especially to avoid SVE extensions unavailable on Mac \
      arm64) zig build --release=fast -Dcpu=baseline;; \
      # Target AVX2 CPUs (2013+) \
      amd64) zig build --release=fast -Dcpu=x86_64_v3;; \
      *) zig build --release=fast;; \
    esac

COPY build/dist.py ./
RUN ./dist.py /dist/kiesel \
      --binary=/src/zig-out/bin/kiesel \
      version="$(/src/zig-out/bin/kiesel --version | grep -i kiesel | grep -o '[0-9].*')"

# Copy test262 results generated and checked-in by CI workflow.
# Rerunning: see docs/running-test262.md
RUN cp tools/test262/results.json /dist/kiesel.test262.log && \
    sed -En 's/.*TEST262_COMMIT: ([0-9a-f]+)$/\1/p' .forgejo/workflows/ci.yml >/dist/kiesel.test262.rev
