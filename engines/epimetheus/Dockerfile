# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

ARG REPO=https://github.com/jrmuizel/mozilla-cvs-history.git
ARG REV=master

WORKDIR /src
RUN git clone --depth=1 --branch="$REV" "$REPO" . || \
    (git clone --depth=1 "$REPO" . && git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD)

COPY engines/epimetheus/epimetheus.patch /tmp/epimetheus.patch
RUN git apply /tmp/epimetheus.patch

RUN make -C /src/js/src/fdlibm -f Makefile.ref && \
    cd /src/js2 && \
    autoreconf -fiv --install && \
    ./configure --enable-debug && \
    make -j"$(nproc)"

COPY build/dist.py ./
RUN ./dist.py /dist/epimetheus --binary=/src/js2/src/epimetheus
