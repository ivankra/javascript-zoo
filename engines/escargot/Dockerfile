# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/Samsung/escargot.git
RUN git clone --depth=1 "$REPO" .

ARG REV=master
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD
RUN git submodule update --init third_party

RUN apt-get update -y && apt-get install -y --no-install-recommends libicu-dev

# FULL=y: fully-featured build for conformance testing
ARG FULL=n

# Note: builds with -O2 by default
RUN cmake -GNinja -Bbuild \
      -DESCARGOT_MODE=release \
      -DESCARGOT_OUTPUT=shell \
      $(if [ $FULL = y ]; then echo \
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

# --junitname broken in upstream
# ARG TEST262=y
# RUN if [ "$TEST262" = y ] && [ "$FULL" = y ]; then \
#       apt-get update -y && apt-get install -y --no-install-recommends python3-chardet && \
#       git submodule update --init test/test262 && \
#       cp tools/test/test262/excludelist.orig.xml test/test262/excludelist.xml && \
#       cp tools/test/test262/cth.js tools/test/test262/testIntl.js test/test262/harness/ && \
#       cp tools/test/test262/parseTestRecord.py tools/test/test262/test262.py test/test262/tools/packaging/ && \
#       (cd test/test262 && \
#         TZ=US/Pacific GC_FREE_SPACE_DIVISOR=1 python3 tools/packaging/test262.py \
#           --command /src/build/escargot \
#           --summary \
#           --logname /dist/escargot.test262.log \
#           --junitname /dist/escargot.test262.xml) && \
#       git -C test/test262 rev-parse HEAD >/dist/escargot.test262.rev; \
#     fi || true
