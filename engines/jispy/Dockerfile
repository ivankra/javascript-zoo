# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/polydojo/jispy.git
RUN git clone --depth=1 "$REPO" .

ARG REV=master
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD

COPY engines/jispy/jispy.patch ./

RUN git apply jispy.patch && python ./tests.py && \
    mkdir -p /dist/jispy-dist && \
    cp -a jispy.py *.js /dist/jispy-dist

COPY build/dist.py ./
RUN ./dist.py /dist/jispy --wrapper='exec "$SCRIPT_DIR/jispy-dist/jispy.py" "$@"'
