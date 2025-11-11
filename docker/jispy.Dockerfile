# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

ARG REPO=https://github.com/polydojo/jispy.git
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

COPY jispy.patch ./

RUN git apply jispy.patch && python ./tests.py && \
    mkdir -p /dist/jispy-dist && \
    cp -a jispy.py *.js /dist/jispy-dist && \
    ln -s jispy-dist/jispy.py /dist/jispy && \
    du -bc /dist/jispy-dist | tail -1 | cut -f 1 >jsz_dist_size

ENV JS_BINARY=/dist/jispy
CMD ${JS_BINARY}
