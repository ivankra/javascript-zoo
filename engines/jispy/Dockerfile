# SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-debian
FROM $BASE

ARG REPO=https://github.com/polydojo/jispy.git
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

COPY engines/jispy/jispy.patch ./

RUN git apply jispy.patch && python ./tests.py && \
    mkdir -p /dist/jispy-dist && \
    cp -a jispy.py *.js /dist/jispy-dist && \
    ln -s jispy-dist/jispy.py /dist/jispy

COPY build/dist.py ./
RUN ./dist.py /dist/jispy console_log=console.log
