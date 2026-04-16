# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-clang
FROM $BASE

ARG REPO=https://github.com/quickjs-ng/quickjs.git
ARG REV=master

WORKDIR /src
RUN git clone "$REPO" . && git checkout "$REV" && git rev-parse HEAD

RUN make

COPY build/dist.py ./
RUN ./dist.py /dist/quickjs-ng --binary=/src/build/qjs

# DIST262=y: package run-test262 binary as well
ARG DIST262=n
RUN if [ $DIST262 = y ]; then ./dist.py /dist/quickjs-ng_262 --binary=/src/build/run-test262 --no-test; fi

ARG TEST262=y
RUN if [ "$TEST262" = y ] && [ "$DIST262" = y ]; then \
      # QuickJS-NG cut out test262_report.txt output; patching it is easiest way to per-test results \
      sed -i '/atomic_inc(&test_failed);/a flockfile(stdout); fprintf(stdout, "TEST-%s\\t%s\\t%s\\n", ret ? "FAIL" : "PASS", filename, (eval_flags & JS_EVAL_FLAG_STRICT) ? "strict" : "sloppy"); funlockfile(stdout);' run-test262.c && \
      git submodule update --init --checkout --depth 1 && \
      make && make test262-update >test262.log; \
    fi || true
COPY engines/quickjs-ng/convert262.py ./
RUN python3 ./convert262.py test262.log -o /dist/quickjs-ng_262.ci-test262 -b /dist/quickjs-ng --test262-dir=test262 || true
