# Building Hermes:
# https://github.com/facebook/hermes/blob/main/doc/BuildingAndRunning.md
#
# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends libicu-dev libreadline-dev
    #build-essential ca-certificates cmake git ninja-build python3 zip

WORKDIR /src
ARG REPO=https://github.com/facebook/hermes.git
RUN git clone --depth=1 "$REPO" .

ARG REV=static_h
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD

# FULL=y: enable Intl support
ARG FULL=
# STATIC=y: do a fully static build and embed ICU data - ~40M binary
ARG STATIC=

RUN cmake -Bbuild -GNinja -DCMAKE_BUILD_TYPE=Release \
      $(if [ "$FULL" = y ]; then echo -DHERMES_ENABLE_INTL=ON; fi) \
      $(if [ "$STATIC" = y ]; then echo -DHERMES_STATIC_LINK=ON; fi) && \
    cmake --build build

COPY build/dist.py ./
RUN ./dist.py /dist/hermes \
      --binary=/src/build/bin/hermes \
      version="$(git describe --tags | sed 's/hermes-//; s/^v//;')"  # --version lies

# Run test262 via util/test_runner.py, patching it to emit every result to stdout
ARG TEST262=y
RUN if [ "$TEST262" = y ] && [ "$FULL" = y ]; then \
      sed -i '/is_failure = test.code.is_failure/i\        print("RESULT: " + __import__("json").dumps({"test": test.test_name, "code": test.code.name, "msg": test.msg, "output": test.output}, ensure_ascii=False))' utils/testsuite/progress.py && \
      git clone --depth=1 https://github.com/tc39/test262 /src/test262 && \
      python3 utils/test_runner.py --test-intl /src/test262/test -b build/bin >test262.log 2>&1; \
    fi || true
COPY engines/hermes/convert262.py ./
RUN python3 ./convert262.py test262.log -o /dist/hermes.ci-test262 -b /dist/hermes --test262-dir=/src/test262 || true
