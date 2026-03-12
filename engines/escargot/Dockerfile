# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/Samsung/escargot.git
ARG REV=master

WORKDIR /src
RUN (git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)) && \
    git rev-parse HEAD
RUN git submodule update --init third_party

RUN apt-get update -y && apt-get install -y --no-install-recommends libicu-dev

# TEST262=y: build a fully-featured binary for conformance testing
ARG TEST262=

# Note: builds with -O2 by default
RUN cmake -GNinja -Bbuild \
      -DESCARGOT_MODE=release \
      -DESCARGOT_OUTPUT=shell \
      $(if [ $TEST262 = y ]; then echo \
          # Enable some test features, especially $262 object \
          -DESCARGOT_TEST=ON \
          # Enable Temporal/ShadowRealm support \
          -DESCARGOT_TEMPORAL=ON \
          -DESCARGOT_SHADOWREALM=ON \
          # Enable tail call optimization \
          -DESCARGOT_TCO=ON; \
        fi)
RUN ninja -C build

COPY build/dist.py ./
RUN ./dist.py /dist/escargot --binary=/src/build/escargot
