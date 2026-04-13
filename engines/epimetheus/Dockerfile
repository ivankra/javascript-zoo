# SPDX-FileCopyrightText: 2026 Ivan Krasilnikov
# SPDX-License-Identifier: MIT

ARG BASE=jsz-gcc
FROM $BASE

WORKDIR /src
ARG REPO=https://github.com/jrmuizel/mozilla-cvs-history.git
RUN git clone --depth=1 "$REPO" .

ARG REV=master
RUN git fetch --depth=1 origin "$REV" && git checkout FETCH_HEAD && git rev-parse HEAD

COPY engines/epimetheus/epimetheus.patch /tmp/epimetheus.patch
RUN git apply /tmp/epimetheus.patch

RUN make -C /src/js/src/fdlibm -f Makefile.ref && \
    cd /src/js2 && \
    autoreconf -fiv --install && \
    ./configure --enable-debug && \
    make -j"$(nproc)"

COPY build/dist.py ./
RUN ./dist.py /dist/epimetheus --binary=/src/js2/src/epimetheus
